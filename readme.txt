# School Payment & Dashboard Backend API

This project is a backend service for managing student transactions and payments using Node.js, Express.js, and MongoDB. It supports transaction tracking, webhook integration, filtering, pagination, and JWT-based API security.


#  Features

-  Fetch all transactions (with filters, pagination)
-  Fetch transactions by school
-  Transaction status check (via `collect_id`)
-  Webhook to update transaction status
-  Manually update transaction status
-  MongoDB integration
-  Status + Date filters
-  Pagination support


# Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- dotenv


#  Getting Started


1. Set up environment variables

Create a `.env` file and add:

PORT=5000
MONGODB_URI= mongodb+srv://1a1it:asdfghjkl.10@cluster0.ohm50ik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# Running the Server

npm run dev


Server will start on:  
http://localhost:5000


#  API Endpoints

##  Auth Routes

#### POST /auth/login
Returns a JWT token for secured access. You can hardcode or extend this for admin login.


##  Transaction Routes

#### GET /transactions
Fetch all transactions.

Query parameters:
- status = Success | Pending | Failed
- startDate = ISO date
- endDate = ISO date
- page = page number (default: 1)
- limit = items per page (default: 10)

Example:
bash
GET /transactions?status=Success&page=2


#### GET /transactions/school/:school_id
Get all transactions for a specific school.


#### `POST /transactions/check-status`
Check transaction status by `collect_id`.

Body:
json
{
  "collect_id": "COLLECT123"
}



#### `POST /transactions/update-status`
Manually update transaction status.

Body:
json
{
  "collect_id": "COLLECT123",
  "status": "Success"
}



#### `POST /transactions/webhook`
Webhook to automatically update status when a payment provider sends a status payload.

Payload Example:
json
{
  "status": 200,
  "order_info": {
    "order_id": "COLLECT123",
    "order_amount": 2000,
    "transaction_amount": 2200,
    "gateway": "PhonePe",
    "bank_reference": "YESBNK222"
  }
}

