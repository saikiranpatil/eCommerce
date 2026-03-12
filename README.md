# eCommerce

A full-stack eCommerce web application with React frontend and Node.js/Express backend.

## Overview
This project implements a complete online shopping platform.  
- **Frontend**: React (Create React App)  
- **Backend**: Node.js + Express (MVC architecture)  

## Features
- User authentication & management  
- Product catalog (browse/add products)  
- Shopping cart & order processing  

## Project Structure
```
eCommerce/
├── frontend/          # React SPA (public/, src/)
├── server/
│   ├── controller/    # Request handlers
│   ├── database/      # DB connection (connections.js)
│   ├── middleware/
│   ├── model/         # productModel.js, userModel.js, orderModel.js
│   ├── routes/        # API endpoints
│   ├── services/
│   └── utils/
├── app.js             # Server entry point
├── config.env         # Environment variables
└── package.json       # Backend dependencies
```

## Quick Start

1. **Clone the repo**
   ```bash
   git clone https://github.com/saikiranpatil/eCommerce.git
   cd eCommerce
   ```

2. **Install dependencies**
   ```bash
   # Backend (root)
   npm install

   # Frontend
   cd frontend
   npm install
   cd ..
   ```

3. **Environment setup**
   - Rename `config.env` → `.env`
   - Add your `PORT`, database URL, JWT secret, etc.

4. **Run the app**
   ```bash
   # Terminal 1 – Backend
   node app.js

   # Terminal 2 – Frontend
   cd frontend
   npm start
   ```

Open **http://localhost:3000** (frontend) in your browser.

## Tech Stack
- **Frontend**: React, HTML, CSS, JavaScript  
- **Backend**: Node.js, Express, JavaScript  
- **Database**: Configurable via `connections.js` (models suggest MongoDB + Mongoose)
