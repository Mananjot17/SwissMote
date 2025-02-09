# Event Management Project  

## Description  
This project is a **Full-Stack Event Management Application** that allows users to:  
- **Register and Login** (with token-based authentication using cookies)  
- **Create, Update, Delete, and View Events**  
- **Join Events** and track real-time attendee counts (via WebSockets)  
- **Filter Events** by category and date (upcoming or past)  

Both frontend and backend are built and deployed as separate services.  
- **Frontend:** React + Vite + Tailwind CSS  
- **Backend:** Node.js + Express + MongoDB + JWT-based Authentication  

> **Note:** The `.env` file is intentionally included in the repository for easier local setup and testing. Please ensure to update it when deploying in production.

---

## Features  
### Authentication  
- **Register**, **Login**, and **Logout** functionality  
- JWT-based authentication with cookie storage  

### Event Management  
- **Create, Read, Update, Delete (CRUD)** operations for events  
- **Join Events** as an attendee  
- **Real-time attendee updates** using WebSockets  

### Event Filters  
- **Category Filter:** Filter events by category (Conference, Workshop, Webinar, etc.)  
- **Date Filter:** Filter events as `upcoming` or `past`  

### Backend  
- RESTful API built using **Express.js**  
- MongoDB as the database, with **Mongoose** for modeling  
- **WebSockets** for real-time updates on attendee counts  

---

## Installation and Setup  

### Prerequisites  
- **Node.js** (v14 or higher)  
- **MongoDB** (local or MongoDB Atlas)  
- **Git**  

---
