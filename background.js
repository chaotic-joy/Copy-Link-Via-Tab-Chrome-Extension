chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copy-tab-url",
    title: "Copy Tab URL",
    contexts: ["tab"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copy-tab-url" && tab?.url) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (url) => navigator.clipboard.writeText(url),
      args: [tab.url],
    });
  }
});
