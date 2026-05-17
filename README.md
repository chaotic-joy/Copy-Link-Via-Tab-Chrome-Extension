# Copy Tab URL — Chrome Extension

Copy the current tab's URL in one click — or via the right-click page menu.

## Usage

- **Click the toolbar icon** — instantly copies the current tab's URL
- **Right-click anywhere on the page** → select **Copy Tab URL**

## Installation

1. Clone or download this repo
2. Go to `chrome://extensions`
3. Enable **Developer mode** (top right toggle)
4. Click **Load unpacked** and select this folder

## Permissions

| Permission | Reason |
|---|---|
| `tabs` | Read the URL of the current tab |
| `contextMenus` | Add item to the page right-click menu |
| `scripting` | Execute clipboard write in the tab's context |
| `clipboardWrite` | Write the URL to the clipboard |
| `host_permissions` | Required for `scripting` to run on any tab |

## License

[CC BY-NC 4.0](LICENSE) — free to use and modify, no commercial use.

## Files

- `manifest.json` — Extension configuration (Manifest V3)
- `background.js` — Service worker: registers context menu and handles icon clicks
