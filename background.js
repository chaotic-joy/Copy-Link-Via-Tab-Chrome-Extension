function copyUrl(tabId, url) {
  chrome.scripting.executeScript({
    target: { tabId },
    func: (u) => navigator.clipboard.writeText(u),
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
