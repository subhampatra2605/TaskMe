# 🚀 TaskMe – Team Task Management Web Application

## 📌 Overview

**TaskMe** is a full-stack team collaboration platform designed to help users manage projects, assign tasks, and track progress efficiently.

It is built as a simplified version of tools like Trello/Asana and demonstrates real-world full-stack development including authentication, role-based access, REST APIs, and deployment.

---

## 🌐 Live Demo

* 🔗 **Frontend:** https://task-me-9set.onrender.com
* 🔗 **Backend API:** https://taskme-vyn9.onrender.com

---

## 🧑‍💻 Tech Stack

### Frontend

* React (Vite)
* Redux Toolkit
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### Deployment

* Backend: Render
* Frontend: Render / Vercel

---

## ✨ Features

### 🔐 1. Authentication

* User Signup & Login
* Secure authentication using JWT
* Role-based access (Admin / Member)

---

### 📁 2. Project Management

* Create projects
* Admin automatically assigned to creator
* Add/remove team members
* View assigned projects

---

### 📝 3. Task Management

* Create tasks with:

  * Title
  * Description
  * Due date
  * Priority (Low / Medium / High)
* Assign tasks to users
* Update task status:

  * To Do
  * In Progress
  * Completed

---

### 📊 4. Dashboard

* Total tasks count
* Tasks by status
* Tasks per user
* Overdue tasks tracking
* Visual charts for better insights

---

### 🔑 Role-Based Access with Admin Token

The application implements a **secure role assignment mechanism** using an **Admin Invite Token**.

* During signup, users can optionally enter an **Admin Token**
* If the token is valid → user is assigned **Admin role**
* If not provided (or invalid) → user is assigned **Member role**

#### 👑 Admin Capabilities:

* Create and manage projects
* Add or remove team members
* Assign tasks to users
* Access full dashboard analytics

#### 👤 Member Capabilities:

* View assigned projects
* Update task status
* Track personal task progress

> ⚠️ **Note:** The Admin Token is shared securely with authorized users only and is not publicly exposed.


## 🗂️ Project Structure

```
TaskMe/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   └── utils/
│
└── README.md
```

---

## ⚙️ Environment Variables

### 🔹 Backend (.env)

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
FRONT_END_URL=https://task-me-9set.onrender.com
```

---

### 🔹 Frontend (.env)

```
VITE_API_URL=https://taskme-vyn9.onrender.com/api
```

---

## 🚀 Local Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/TaskMe.git
cd TaskMe
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Endpoints (Sample)

| Method | Endpoint          | Description   |
| ------ | ----------------- | ------------- |
| POST   | /api/auth/sign-up | Register user |
| POST   | /api/auth/sign-in | Login         |
| GET    | /api/tasks        | Get all tasks |
| POST   | /api/tasks        | Create task   |
| PUT    | /api/tasks/:id    | Update task   |
| DELETE | /api/tasks/:id    | Delete task   |

---

## 🧪 Key Highlights

* Clean REST API architecture
* Scalable folder structure
* Secure authentication system
* Real-time task workflow simulation
* Production deployment with environment configs

---

## 🏆 Why This Project Stands Out

* End-to-end full-stack implementation
* Real-world use case (team collaboration)
* Role-based access control
* Deployed and publicly accessible
* Production-ready architecture

---
