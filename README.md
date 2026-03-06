# QuickHire – Backend API

This is the backend API for **QuickHire**, a simple job board application built as part of the Associate Software Engineer technical assessment.

The backend provides RESTful APIs to manage job listings and job applications. All the mentioned endpoints have been implemented for both job route and application route. This is the github link for QuickHire Frontend: https://github.com/waledkarim/quickhire-frontend.

### Deployment

The backend has been deployed on Render, link: https://quickhire-backend-c4cr.onrender.com

## Main Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

## Validation

**Basic validation is implemented to ensure data integrity:**

- Required fields must be provided
- Email must be properly formatted
- Resume link must be a valid URL
- Invalid requests return appropriate error responses

## Notes

- MongoDB is used for persistent data storage.
- The backend is designed to work with the QuickHire frontend application.
- **Ensure the backend server is running before starting the frontend.**

# ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/quickhire-backend.git
cd quickhire-backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create .env file:

```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### 4️⃣ Start the dev server

```bash
npm run dev
```
