# 🎟️ EventEase Pro

**EventEase Pro** is a secure event booking and management system built using the **MERN stack**.  
It enables admins to manage events (CRUD) and users to book seats with **real-time availability checks**, ensuring **atomic booking control** to prevent overbooking.

---

## 🎯 Objective

To develop a **full-stack event booking platform** with authentication, admin control, and atomic seat booking logic — ensuring no overbooking occurs while providing a responsive and user-friendly experience.

---

## ⚙️ Core Features

### 👨‍💼 Admin Module
- Create, update, delete, and manage events  
- View event details including booking statistics  
- AI-powered **Demand Forecast** feature to predict event popularity

### 🙋‍♀️ User Module
- Register and login securely  
- Book seats with **real-time seat availability**  
- Prevent overbooking using **atomic transaction logic**  

---

## 🧱 Schema Design (MongoDB)

| Field | Type | Description |
|-------|------|-------------|
| title | String | Event name |
| category | String | Type (Music, Comedy, Conference, etc.) |
| date | Date | Scheduled event date |
| venue | String | Location of the event |
| price | Number | Ticket price |
| availableSeats | Number | Total remaining seats |
| bookedSeats | Number | Total booked seats |

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js + Axios + Tailwind CSS |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB (Compass) |
| **Authentication** | JWT (JSON Web Token) |
| **Version Control** | Git + GitHub |
| **Optional Deployment** | Vercel (Frontend) / Render (Backend) |

---

## 🧠 API Documentation

### Base URL
```
http://localhost:5000/api
```

---

### 🟢 1. Register User  
**POST** `/api/users/register`  
Registers a new user.

**Request Body**
```json
{
  "name": "Sneha",
  "email": "sneha@gmail.com",
  "password": "123456"
}
```

---

### 🟢 2. Login User  
**POST** `/api/users/login`  
Logs in and returns a JWT token.

**Response**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

---

### 🟣 3. Get All Events  
**GET** `/api/events`  
Returns all available events.

**Sample Response**
```json
[
  {
    "title": "Music Concert",
    "category": "Entertainment",
    "date": "2025-12-10",
    "venue": "Kochi Stadium",
    "price": 500,
    "availableSeats": 100,
    "bookedSeats": 10
  }
]
```

---

### 🟡 4. Add Event (Admin Only)  
**POST** `/api/events`  
**Headers:** `Authorization: Bearer <admin_token>`

**Request Body**
```json
{
  "title": "Tech Conference",
  "category": "Technology",
  "date": "2025-11-20",
  "venue": "Infopark, Kochi",
  "price": 300,
  "availableSeats": 50
}
```

---

### 🟠 5. Update Event (Admin Only)  
**PUT** `/api/events/:id`

**Request Body**
```json
{
  "price": 400,
  "venue": "Lulu Convention Center"
}
```

---

### 🔴 6. Delete Event (Admin Only)  
**DELETE** `/api/events/:id`

---

### 🔵 7. Book Event (User)  
**POST** `/api/events/:id/book`  
Ensures **atomic booking** — prevents seat overbooking.

**Response**
```json
{
  "message": "Booking successful",
  "availableSeats": 49
}
```

---

## 💡 AI Demand Forecast (Bonus Feature)
Predicts event demand dynamically based on seat bookings:

| Demand Level | Logic |
|---------------|--------|
| 🔥 High | `bookedSeats > 80%` |
| ⚡ Medium | `bookedSeats > 50%` |
| 🌿 Low | `bookedSeats < 50%` |

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Snehasivakumar16/EventEasePro.git
cd EventEasePro
```

### 2️⃣ Install dependencies

#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
cd ../frontend
npm install
```

---

### 3️⃣ Configure Environment Variables  
Create a `.env` file in your `backend` folder:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/eventeasepro
JWT_SECRET=your_jwt_secret
```

---

### 4️⃣ Run the servers

**Start Backend**
```bash
npm start
```

**Start Frontend**
```bash
npm run dev
```

**Access:**
- Frontend → `http://localhost:5173`
- Backend → `http://localhost:5000`

---

## 📊 Example Events Data
```json
[
  {
    "title": "Art Expo",
    "category": "Exhibition",
    "date": "2025-11-25",
    "venue": "Bolgatty Palace",
    "price": 200,
    "availableSeats": 50,
    "bookedSeats": 10
  },
  {
    "title": "Comedy Night",
    "category": "Entertainment",
    "date": "2025-12-05",
    "venue": "Kochi Theater",
    "price": 300,
    "availableSeats": 75,
    "bookedSeats": 15
  }
]
```

---

## 🧑‍💻 Author
👩‍💻 **Sneha Sivakumar**  
📍 India  
🌐 GitHub: [Snehasivakumar16](https://github.com/Snehasivakumar16)  
💬 Passionate Full Stack Developer | MERN | AI-Driven Solutions  

---

## 🧾 License
This project was created as part of the **MERN Stack Developer Technical Round Assignment (EventEase Pro)**.  
© 2025 Sneha Sivakumar. All Rights Reserved.
