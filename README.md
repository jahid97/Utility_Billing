# ⚡ Utility Bill Management System

A full-stack small application to calculate utility bills and manage pricing configurations dynamically with a billing receipt download option. Built with modern TypeScript, featuring a React frontend and a NestJS backend.

## Live : https://utility-app-chi.vercel.app/

## 🚀 Live Demo
- **Frontend (User UI):** [https://utility-app-chi.vercel.app](https://utility-app-chi.vercel.app/)
- **Backend (API):** [https://utility-app-b08w.onrender.com](https://utility-app-b08w.onrender.com/)
- **Admin Password:** mySuperSecretKey123
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
## ⚙️ Installation & Local Setup

Follow these steps to run the project locally on your machine.

**Clone the Repository**
```bash
git clone [https://github.com/YOUR_USERNAME/utility-bill-app.git]
cd utility-bill-app
```

**Backend Setup**

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```
Create a .env file in the backend folder:
```bash
backend/.env
DATABASE_URL="postgres://user:pass@endpoint.neon.tech/neondb"
ADMIN_SECRET="mySuperSecretKey123"
PORT=3000
```
Start the backend server:
```bash
npm run start:dev
```
The backend runs at http://localhost:3000

**Frontend Setup**

Open a new terminal, navigate to the frontend folder:

```bash
cd ../frontend
npm install
```
Create a .env file in the frontend folder:

```bash
frontend/.env
VITE_API_URL="http://localhost:3000/api/home"
```
Start the frontend server:
```bash
npm run dev
```

The frontend runs at http://localhost:5173

## API Endpoints

The backend exposes the following RESTful endpoints:

| Method | Endpoint | Description | Protected? |
|--------|----------|-------------|------------|
| GET    | `/`      | Health check (Returns "API is running") | No |
| POST   | `/api/home/calculate` | Calculate bill amount based on units | No |
| PUT    | `/api/home/admin/config` | Update pricing rules | Yes (Requires Header) |
| GET    | `/api/home/admin/config` | Get current pricing rules | Yes (Requires Header) |




Authentication: Admin routes require a header x-admin-key matching the ADMIN_SECRET environment variable.


## Deployment Guide
**Backend (Render)**
1. Push code to GitHub.
2. Create a new Web Service on Render.
3. Set Root Directory to `backend`.
4. Add Environment Variables (`DATABASE_URL`, `ADMIN_SECRET`).

   
**Frontend (Vercel)**
1. Import repo to Vercel.
2. Set Root Directory to frontend.
3. Add Environment Variable VITE_API_URL (Set to your Render URL + /api/home).

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.
