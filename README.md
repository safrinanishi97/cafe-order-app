# Cafetoria Cafe Order App

🔗 **Live Demo:** https://cafe-order-app-rust.vercel.app/

A simple and user-friendly cafe order management application built with Angular.  
The app is designed to help cafe staff quickly create, manage, serve, edit, and track customer orders.

---

## ✨ Features

- 🍔 Create new orders
- 📋 View active orders
- 🔢 Automatic order numbering
- 🪑 Indoor and outdoor table selection
- 🚫 Prevent selecting occupied tables
- 🍕 Food categories
- 🥤 Food variants and sizes
- ➕ Increase / decrease food quantity
- 💰 Automatic order total calculation
- 📦 View order details
- 🍽️ Serve items individually
- ↩️ Undo served quantities
- ✏️ Edit active orders
- 📜 Order history
- 🔎 Search order history
- 🎯 Filter order history by status
- 💾 LocalStorage-based data persistence
- 📱 Responsive design for mobile, tablet, and desktop

---

## 🛠️ Technologies Used

- Angular 21
- TypeScript
- HTML
- SCSS
- Angular Signals
- LocalStorage
- Vercel

---

## 📱 Main Screens

### Home
Provides an overview of active orders and quick access to create a new order.

### New Order
Select food items, variants, quantities, and table information before saving an order.

### Order Details
View complete order information, track served quantities, and manage the order status.

### Edit Order
Modify an active order while respecting already-served quantities.

### Order History
View completed and cancelled orders with search and status filtering.

---

## 💾 Data Storage

This application currently uses the browser's **LocalStorage** to store order information.

No backend database is required for the current version.

> **Note:** Because the app uses LocalStorage, order data is stored separately in each browser/device.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Angular CLI

### Clone the Repository


git clone https://github.com/safrinanishi97/cafe-order-app.git

### Navigate to the Project
- cd cafe-order-app

### Install Dependencies
- npm install

### Start the Development Server
- ng serve

### Then open:

http://localhost:4200/

The application will automatically reload when source files are changed.

### 🏗️ Production Build

To create a production build:

- ng build

The generated files will be available inside:

- dist/

### 🌐 Deployment

The application is deployed using Vercel.

#### Live Application

https://app-rust.vercel.app/

Every new push to the connected GitHub repository can automatically trigger a new deployment on Vercel.

### 📂 Project Structure

```
src/
├── app/
│   ├── data/
│   ├── home/
│   ├── models/
│   ├── order-details/
│   ├── order-history/
│   ├── orders/
│   │   ├── edit-order/
│   │   └── new-order/
│   ├── services/
│   └── toast/
│
├── public/
│   └── foods/
│
└── ...
```

### 📌 Current Version

Version: 1.0

The current version is a frontend-only cafe order management application.

Order data is currently stored in the browser using LocalStorage.

### 🔮 Future Improvements

Possible future improvements include:

- Backend API integration
- Database integration
- User authentication
- Multiple staff accounts
- Cloud-based order synchronization
- Kitchen display screen
- Order notifications
- Printable receipts
- Sales reports
- Daily / monthly sales analytics
- PWA / mobile app support

### 👩‍💻 Author

Safrina Akter

Software Developer