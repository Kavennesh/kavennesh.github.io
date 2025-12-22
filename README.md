# Portfolio Website

A static portfolio website built with React.

## Running Locally in VS Code

### Option 1: Using Live Server Extension (Recommended)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. The site will open in your browser at `http://localhost:5500`

### Option 2: Using Python HTTP Server
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open `http://localhost:8000` in your browser.

### Option 3: Using Node.js http-server
```bash
# Install globally (one time)
npm install -g http-server

# Run the server
http-server -p 8000
```
Then open `http://localhost:8000` in your browser.

## Files Structure
- `index.html` - Main HTML file
- `assets/` - Compiled JavaScript and CSS files
- Images and other static assets in the root directory
