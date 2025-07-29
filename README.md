# 🚀 Prioriplant — Project Setup Guide

This guide will help you install and run **Prioriplant** on your local machine.

---

## 1️⃣ Prerequisites
Before you start, make sure you have:

1. **Node.js (LTS version)**
   - Download from: [https://nodejs.org](https://nodejs.org)
   - Install the **LTS** version (not the "Current" version)
   - Make sure to include **npm** (Node Package Manager) during installation
Note:  If you already have Node.js installed, you still have to run npm install.

2. **Git**
   - Download from: [https://git-scm.com/](https://git-scm.com/)
   - Required to clone the repository

3. **Code Editor**
   - Recommended: [Visual Studio Code](https://code.visualstudio.com/)
   - Or Cursor (which is basically VSCode with AI)
---

## 2️⃣ Verify Installations
Open a terminal (**Command Prompt**, **PowerShell**, or **VS Code Terminal**) and run:

```bash
node -v
npm -v
git --version
```
You should see version numbers for all three. Example:
```
v20.x.x
10.x.x
2.x.x
```

---

## 3️⃣ Clone the Repository
Navigate to the folder where you want the project to live, then run:
```bash
git clone https://github.com/YOUR-GITHUB-ORG/Prioriplant.git
```

This creates a new folder named `Prioriplant` with all the project files.

---

## 4️⃣ Enter the Project Folder
```bash
cd Prioriplant
```

---

## 5️⃣ Install Dependencies
```bash
npm install
```
This installs all the packages the app needs.

---

## 6️⃣ Start the Development Server
```bash
npm run dev
```
The terminal will show something like:
```
VITE vX.X.X  ready in X ms
Local: http://localhost:5173/
```
> If it shows a different port, that’s fine — use the one shown in your terminal.

---

## 7️⃣ Open in Browser
Open the link shown in your terminal (e.g., `http://localhost:5173/`).

---

## 8️⃣ Stop the Server
When finished, stop the dev server by pressing:
```
CTRL + C
```

---

## 📌 Notes
- TailwindCSS, Vite, and Radix UI are already installed — no need to install them separately.
- If you see **port already in use**, close the other program or let Vite run on a different port.
- Your work will auto-refresh in the browser whenever you save changes.

---

## 🔥 Quick Commands Recap
```bash
# First time only
git clone https://github.com/YOUR-GITHUB-ORG/Prioriplant.git
cd Prioriplant
npm install

# Every time you work
npm run dev




Everything belwo this line was previously in the Readme and may have been replaced by the instructions above.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])



Contributors
John Schlautman (schlajo)