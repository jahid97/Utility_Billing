# ⚡ Utility Bill Management System

A full-stack application to calculate utility bills and manage pricing configurations dynamically. Built with a modern TypeScript stack, featuring a React frontend and a NestJS backend.

![Project Status](https://img.shields.io/badge/status-live-success)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🚀 Live Demo
- **Frontend (User UI):** [https://utility-app.vercel.app](YOUR_VERCEL_LINK_HERE)
- **Backend (API):** [https://utility-app-backend.onrender.com](YOUR_RENDER_LINK_HERE)

---

## ✨ Features

### 👤 User Portal
- **Bill Calculator:** Users can enter their unit consumption.
- **Real-time API:** Fetches calculation logic instantly from the backend without page reloads.
- **Responsive Design:** Works seamlessly on desktop and mobile.

### 🛡️ Admin Panel
- **Secure Access:** Protected by an Admin PIN/Key.
- **Dynamic Pricing:** Admins can update the "Price per Unit" and other rules in real-time.
- **Persistent Storage:** Configuration changes are saved to a PostgreSQL database.

---

## 🛠️ Tech Stack

**Frontend:**
- ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) **React.js (Vite)**
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) **TypeScript**
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) **Tailwind CSS**

**Backend:**
- ![NestJS](https://img.shields.io/badge/nestjs-E0234E?style=flat&logo=nestjs&logoColor=white) **NestJS**
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white) **PostgreSQL** (via Neon.tech)
- ![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=flat&logo=typeorm&logoColor=white) **TypeORM**

**Deployment:**
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Neon (Serverless Postgres)

---

## 📂 Project Structure

This project is organized as a monorepo:

```bash
├── frontend/         # React Client Application
│   ├── src/
│   ├── .env          # Frontend Environment Variables
│   └── package.json
│
├── backend/          # NestJS Server Application
│   ├── src/
│   ├── .env          # Backend Secrets (Database & Admin Key)
│   └── package.json
│
└── README.md
```
##⚙️ Installation & Local Setup
Follow these steps to run the project locally on your machine.
** 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/utility-bill-app.git](https://github.com/YOUR_USERNAME/utility-bill-app.git)
cd utility-bill-app
```

