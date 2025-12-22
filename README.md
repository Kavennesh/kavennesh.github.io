# Portfolio Website

A static portfolio website that can be opened and edited directly in VS Code.

## Quick Start

### Option 1: VS Code Live Server Extension
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 2: Python HTTP Server
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000 in your browser

### Option 3: Node.js HTTP Server
```bash
npx http-server -p 8000
```
Then open http://localhost:8000 in your browser

## Project Structure
- `index.html` - Main HTML file
- `assets/` - Compiled CSS and JavaScript files
- Images and other static assets in the root directory

## Editing
Simply open any file in VS Code and start editing. Changes will be visible after refreshing your browser (or automatically with Live Server).
