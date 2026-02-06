# FormGuard ✅

FormGuard is a **reusable, UI-friendly form validation module** designed to handle **email validation, password visibility toggle, and password strength checks** with a clean and intuitive user experience.

It focuses on **real-time validation feedback**, making forms more secure, user-friendly, and visually informative.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\

---

## 🚀 Overview

FormGuard validates common form fields with special focus on:
- **Custom email validation using regex**
- **Password hide / unhide functionality**
- **Live password strength checker UI**
- **Rule-based validation driven by configurable parameters**

---

### ⚙️ Rule-Based Validation (Config Driven)
Validation behaviour can be controlled using parameters such as:
- Minimum password length
- Required uppercase letters
- Required lowercase letters
- Required numbers
- Required special characters

Example rules:
- `minLength: 8`
- `requireUppercase: true`
- `requireNumber: true`

