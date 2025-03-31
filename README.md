# Tenant Management Application

## Overview
The **Tenant Management Application** is a web-based system designed to efficiently manage tenants, rooms, and monthly invoices. It features a mobile-friendly interface and helps property managers keep track of tenant information, assign rooms, and generate invoices that include various charges like rent, utilities, and other costs.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Express.js
- **Database**: PostgreSQL

## Features
- **Tenant Management**: Add, update, and delete tenants with ease.
- **Room Assignment**: Assign tenants to specific rooms and manage occupancy.
- **Invoice Generation**: Automatically create monthly invoices for tenants, including:
  - Room Rent
  - Water Supply Charges
  - Electricity Charges
  - Other Miscellaneous Charges
- **Mobile-Friendly Interface**: Fully responsive design to work on both mobile and desktop devices.

## Setup Guide

### Prerequisites
- Node.js and npm installed
- PostgreSQL database setup

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables (e.g., `.env` file):
   ```sh
   DATABASE_URL=postgres://user:password@localhost:5432/tenant_db
   PORT=5000
   ```
4. Run database migrations (if applicable):
   ```sh
   npm run migrate
   ```
5. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm start
   ```

### Running the Application
Once both the backend and frontend servers are running, you can access the web app at:
```
http://localhost:3000
```

## Future Enhancements
- Payment Integration
- Automated Invoice Reminders
- Admin Dashboard for Reports & Analytics