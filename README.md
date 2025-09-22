# Petrol Pump Dispensing Log Application

## 🚀 Project Overview
This is a full-stack web application designed to log fuel dispensing details at a petrol pump. It allows authenticated users to add new dispensing records and view a filterable list of all past records.

## 🛠️ Tech Stack
- **Frontend**: Angular (Standalone Components) with Bootstrap for responsive UI
- **Backend**: .NET Core Web API
- **Database**: SQL Server
- **Authentication**: JWT Token-based authentication

## 📸 Features
### 1. Login Page
- Simple login form with username and password
- JWT-based authentication
- Redirects to listing page on successful login

### 2. Entry Page
- Form to create a new dispensing record
- Fields:
  - Dispenser No (Dropdown)
  - Quantity Filled (Liters)
  - Vehicle Number
  - Payment Mode (Radio buttons)
  - Payment Proof (File upload: .jpg, .png, .pdf)
- Accessible only to authenticated users

### 3. Listing Page
- Displays all dispensing records in a table
- Includes filters:
  - Dispenser No
  - Payment Mode
  - Date Range
- Allows viewing/downloading payment proof

## 🧪 Setup Instructions

### 🌐 Frontend (Angular)

1. Install dependencies:
   ```bash
   npm install
   ```
1. Run the Angular app:
   ```bash
   ng serve
   ```
3. Access the app at `http://localhost:4200`

## 🔐 Authentication Details
- Default login credentials (for testing):
  - **Username**: `admin`
  - **Password**: `admin123`
- JWT token is stored in `localStorage` and used for API authorization


