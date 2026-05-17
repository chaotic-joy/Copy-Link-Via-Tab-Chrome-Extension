# Copy Tab URL — Chrome Extension

Copy the current tab's URL in one click — or via the right-click page menu. Works on all pages including Chrome internal pages (`chrome://`).

## Usage

- **Click the toolbar icon** — instantly copies the current tab's URL
- **Right-click anywhere on the page** → select **Copy Tab URL**

On regular pages, a large orange toast confirms the copy. On Chrome internal pages (`chrome://`, `about://`, etc.), a ✓ badge appears on the toolbar icon instead.

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
| `scripting` | Inject toast notification on regular pages |
| `clipboardWrite` | Write the URL to the clipboard |
| `offscreen` | Copy to clipboard on restricted Chrome pages |
| `host_permissions` | Required for `scripting` to run on any tab |

## Files

- `manifest.json` — Extension configuration (Manifest V3)
- `background.js` — Service worker: handles copying and context menu
- `offscreen.html` / `offscreen.js` — Clipboard fallback for restricted pages
- `LICENSE` — CC BY-NC 4.0

## License

[CC BY-NC 4.0](LICENSE) — free to use and modify, no commercial use.
