# tech_eazy_-yashwp20042000-_aws_internship_backend
Secure_Parcel_Delivery_Backend

# Secure Parcel Delivery Backend

## Overview
This is the backend service for a Delivery Management System that provides:
- User authentication with JWT
- Role-based access control (Admin/Vendor)
- Delivery order management
- Parcel tracking functionality

## Features Implemented
1. **Authentication System**
   - JWT-based authentication
   - Secure password hashing
   - Role-based authorization middleware

2. **Delivery Order Management**
   - File upload for delivery orders
   - Filtering by vendor and date
   - Status tracking

3. **Parcel Tracking**
   - Real-time parcel status updates
   - Grouping by pincode
   - Public tracking endpoint

## Technical Stack
- Node.js with Express
- MongoDB (Mongoose ODM)
- JWT for authentication
- TypeScript for type safety
- RESTful API design

## Setup Instructions
1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file with required variables
4. Start the server: `npm run dev`

## API Documentation
Endpoints are available at `/api`:
- `/auth` - Authentication routes
- `/delivery` - Delivery order management
- `/parcels` - Parcel tracking
