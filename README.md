# 🧩 DOM Watcher - Chrome Extension

A minimalistic and elegant Chrome extension that **monitors DOM changes** on any webpage. Designed specifically to track new `<div>` elements being added inside a specified parent container — like `payouts-block` — and record their numeric values in real time.

---

## 📦 Features

✅ Start/Stop DOM monitoring  
✅ Automatically extracts numeric values (e.g. from `1.90x`, it stores `1.90`)  
✅ Realtime logging with timestamps  
✅ Timezone support (e.g. Karachi, London, UTC, etc.)  
✅ Export recorded data as `.txt` or `.csv`  
✅ Refresh, Clear, and Status display  
✅ Material Design with responsive icons  
✅ Snackbar-style error messages for invalid class names  
✅ Vertically scrollable log panel  
✅ Persistent logs until manually cleared

---

## 🛠 File Structure

```
extension/
│
├── manifest.json            # Chrome extension config
├── popup.html               # UI of the popup
├── popup.js                 # Controls popup behavior
├── content.js               # Injected script to monitor DOM
├── style.css                # Material theme styling
├── icon.png                 # Icon for extension
├── icons/                   # Multiple icon sizes (16, 48, 128)
└── README.md                # You're reading it!
```

---

## ⚙️ How to Use

1. **Load the Extension:**
   - Go to `chrome://extensions`
   - Enable `Developer mode`
   - Click **Load unpacked**
   - Select the `extension/` folder

2. **Set the Parent Class:**
   - Example: `payouts-block`

3. **Click ▶ Start**
   - Starts tracking new children added to that element
   - Each time a new value like `1.90x` appears, it logs `1.90` with timestamp

4. **Available Controls:**
   - ⏹ Stop tracking
   - 🔁 Refresh UI
   - 🗑 Clear logs
   - 📥 Export all logs as file

---

## ✨ Example Use Case

Monitoring gambling game UIs that append `<div>` elements like:

```html
<div class="payouts-block">
  <div class="payout">1.90x</div>
</div>
```

This extension captures new `.payout` divs and logs `1.90`.

---

## 🖤 Credits

**Created with love by Jawad**

---

## 📜 License

MIT License
