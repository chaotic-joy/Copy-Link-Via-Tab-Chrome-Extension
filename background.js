function isRestricted(url) {
  return /^(chrome|chrome-extension|devtools|about):\/\//.test(url);
}

async function copyViaOffscreen(tabId, url) {
  await chrome.offscreen.createDocument({
    url: chrome.runtime.getURL("offscreen.html"),
    reasons: ["CLIPBOARD"],
    justification: "Copy URL to clipboard on restricted pages",
  }).catch(() => {});

  await new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: "copy-url", url }, () => resolve());
  });

  await chrome.offscreen.closeDocument().catch(() => {});

  chrome.action.setBadgeText({ text: "✓", tabId });
  chrome.action.setBadgeBackgroundColor({ color: "#FF7800", tabId });
  setTimeout(() => chrome.action.setBadgeText({ text: "", tabId }), 1500);
}

function copyUrl(tabId, url) {
  if (isRestricted(url)) {
    copyViaOffscreen(tabId, url);
    return;
  }

  chrome.scripting.executeScript({
    target: { tabId },
    func: (u) => {
      navigator.clipboard.writeText(u);

      const toast = document.createElement("div");
      toast.textContent = "✓ URL Copied";
      Object.assign(toast.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(255,120,0,0.9)",
        color: "#fff",
        padding: "50px 100px",
        borderRadius: "34px",
        fontSize: "59px",
        fontFamily: "system-ui, sans-serif",
        zIndex: "2147483647",
        pointerEvents: "none",
        opacity: "1",
        transition: "opacity 0.9s ease",
      });

      document.body.appendChild(toast);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { toast.style.opacity = "0"; });
      });
      setTimeout(() => toast.remove(), 900);
    },
    args: [url],
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copy-tab-url",
    title: "Copy Tab URL",
    contexts: ["page"],
  });
});

// Right-click on page → context menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copy-tab-url" && tab?.url) {
    copyUrl(tab.id, tab.url);
  }
});

// Click extension icon → instant copy
chrome.action.onClicked.addListener((tab) => {
  if (tab?.url) copyUrl(tab.id, tab.url);
});
