# Copy Tab URL — Chrome Extension

Right-click any tab to instantly copy its URL to your clipboard.

## Installation

1. Clone or download this repo
2. Go to `chrome://extensions`
3. Enable **Developer mode** (top right toggle)
4. Click **Load unpacked** and select this folder
5. Right-click any tab → **Copy Tab URL**

## Permissions

| Permission | Reason |
|---|---|
| `tabs` | Read the URL of the right-clicked tab |
| `contextMenus` | Add the item to the tab context menu |
| `scripting` | Execute clipboard write in the tab's context |
| `clipboardWrite` | Write the URL to the clipboard |
| `host_permissions` | Required for `scripting` to run on any tab |

## Files

- `manifest.json` — Extension configuration (Manifest V3)
- `background.js` — Service worker: registers context menu and handles clicks
