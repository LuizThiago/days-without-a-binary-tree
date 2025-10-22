# 🧮 Days Without Binary Tree

A split-flap counter showing how many days have passed since the last time we had to invert a binary tree at work.  
Built with **Next.js**, **React**, and **TailwindCSS**.

---

## 🚀 Demo

> [🔗 Live Preview](diassemarvorebinaria.dev)

---

## 🧠 Overview

This project is a playful yet technical demo that mimics a **split-flap display**,  
like the old airport boards, to show the number of days since a fixed date.

It:

- Calculates the number of days since a specific start date.
- Updates **automatically at midnight UTC**.
- Features a **flip-style animation** on startup.
- Uses clean and minimal design with **TailwindCSS gradients and shadows**.

---

## 🧩 Tech Stack

- [Next.js](https://nextjs.org/) – React framework for SSR and routing
- [React](https://react.dev/) – Component-based UI library
- [TailwindCSS](https://tailwindcss.com/) – Utility-first CSS styling
- [TypeScript](https://www.typescriptlang.org/) – (optional) static typing

---

## 📁 Project Structure

```
days-without-binary-tree/
│
├── app/                  # Next.js app directory
├── components/           # UI components (SplitFlapDisplay, etc.)
├── public/               # Static assets
├── .gitignore
├── LICENSE
├── README.md
└── package.json
```

---

## ⚙️ Setup & Run Locally

```bash
# Clone this repository
git clone https://github.com/<your-username>/days-without-binary-tree.git
cd days-without-binary-tree

# Install dependencies
npm install

# Run locally
npm run dev

# Visit in your browser
http://localhost:3000
```

---

## 🕒 How It Works

- The counter starts from a fixed UTC date (`START_DATE_UTC`).
- It calculates the number of full days passed since that date.
- The counter updates itself **exactly at 00:00 UTC**.
- During startup, the digits "shuffle" before showing the final number (split-flap effect).

---

## 🧑‍💻 Example

```js
const START_DATE_UTC = "2015-10-22T00:00:00Z"; // Customize your start date
```

If today is October 22, 2025, the display will show `3652`.

---

## 🪪 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for more details.

---

## 💬 About

Created just for fun — and to avoid inverting another binary tree.  
Built by [Luiz Thiago](https://github.com/<your-username>).

---
