# 🎟️ EventEase Pro

**EventEase Pro** is a secure event booking and management system built using the **MERN stack**.  
It enables admins to manage events (CRUD) and users to book seats with real-time availability checks, ensuring atomic booking control to prevent overbooking.

---

## 🎯 Objective

To develop a full-stack event booking platform with proper authentication, admin control, and atomic seat booking logic to ensure no overbooking occurs.

---

## ⚙️ Core Features

### 👨‍💼 Admin Module
- Create, update, delete, and manage events  
- View event details including booking statistics  
- AI-powered **Demand Forecast** feature to predict event popularity

### 🙋‍♂️ User Module
- Browse and search events by category, date, or venue  
- Book seats securely using JWT-based authentication  
- Prevents overbooking using atomic booking logic

---

## 🧱 Schema Design (MongoDB)

| Field | Type | Description |
|-------|------|-------------|
| title | String | Name of the event |
| category | String | Type of event (Music, Comedy, Conference, etc.) |
| date | Date | Scheduled date/time |
| venue | String | Event location |
| price | Number | Ticket price |
| availableSeats | Number | Remaining seats |
| bookedSeats | Number | Number of booked seats |

---

## 🧰 Tech Stack

**Frontend:** React + Axios + Tailwind CSS  
**Backend:** Node.js + Express.js  
**Database:** MongoDB (Compass)  
**Authentication:** JWT (JSON Web Token)  
**Version Control:** Git + GitHub  

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Snehasivakumar16/EventEasePro.git
cd EventEasePro
2️⃣ Install dependencies
For backend:

bash
Copy code
cd backend
npm install
For frontend:

bash
Copy code
cd ../frontend
npm install
3️⃣ Configure Environment Variables
Create a .env file inside your backend folder:

ini
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
💡 Since you’re using MongoDB Compass, you can copy your local connection string (usually mongodb://127.0.0.1:27017/eventeasepro).

4️⃣ Run the servers
Start backend:

bash
Copy code
npm start
Start frontend:

bash
Copy code
npm run dev
Your app will run on:

Frontend: http://localhost:5173

Backend: http://localhost:5000

🤖 Bonus Feature — AI Demand Forecast
Each event includes an AI-based forecast API endpoint that predicts booking demand based on past seat bookings.

High demand: bookedSeats > 80%

Medium demand: bookedSeats > 50%

Low demand: bookedSeats < 50%

🧑‍💻 Author
👩‍💻 Sneha Sivakumar
GitHub Profile

📜 License
This project is created as part of the MERN Stack Developer Technical Round Assignment.
All rights reserved © 2025.
