chrome.runtime.onMessage.addListener(({ type, url }, _sender, sendResponse) => {
  if (type === "copy-url") {
    const textarea = document.createElement("textarea");
    textarea.value = url;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    sendResponse({ ok: true });
    return true;
  }
});
