# COMP 3123 - Assignment 1 (Backend REST API)

**Name:** Deniz Can
**Student ID:** 101591488

## Deployment
**Live API URL (Vercel):** https://101591488-comp-3123-assignment1.vercel.app

## Project Overview
This project is a RESTful backend API built for COMP 3123 Assignment 1. It manages users and employees. Users can create an account, log in securely using JWT, and manage their own employee records. The application ensures that users can only view, update, or delete employees they have created.

## Technologies Used
- **Node.js & Express.js** for the backend server and routing.
- **MongoDB & Mongoose** for the database and data modeling (Database name: `comp3123_assignment1`).
- **bcrypt** for password hashing.
- **jsonwebtoken (JWT)** for authentication.
- **Helmet** for HTTP header security.
- **express-rate-limit** to prevent brute-force attacks.

## Installation and Setup
1. **Clone the repository:**
   `git clone https://github.com/denizccann/101591488_COMP3123_Assignment1.git`
2. **Install dependencies:**
   `npm install`
3. **Configure environment variables:**
   Create a `.env` file in the root folder using `.env.example` as a reference. Add:
   - `PORT`: 3000
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your secret key for JWT
4. **Start MongoDB:** Ensure your MongoDB local server or Atlas cluster is running.
5. **Start the application:**
   `npm start` (or `node index.js`)
6. **Test the API:** Use Postman or Thunder Client to test the endpoints.

## Configuration
The project uses environment variables to keep sensitive data safe. Do not share your `.env` file. A safe `.env.example` is provided in the repository to show which variables are needed.

## API Endpoints
**User APIs (Public)**
- `POST /api/v1/user/signup`: Register a new user.
- `POST /api/v1/user/login`: Authenticate a user and return a JWT.

**Employee APIs (Protected)**
*(Requires `Authorization: Bearer <jwt_token>` in the header)*
- `GET /api/v1/emp/employees`: Get all employees owned by the logged-in user.
- `POST /api/v1/emp/employees`: Create a new employee.
- `GET /api/v1/emp/employees/{eid}`: Get details of a specific employee.
- `PUT /api/v1/emp/employees/{eid}`: Update a specific employee.
- `DELETE /api/v1/emp/employees?eid={eid}`: Delete a specific employee.

**Health Check**
- `GET /health`: Checks if the API is running successfully.

## Authentication and Authorization
- **Authentication:** When a user signs up and logs in, the server generates a JSON Web Token (JWT). The client must send this token in the Authorization header (`Bearer <token>`) to access protected employee routes.
- **Authorization (Data Ownership):** The API ensures that a user can only access employees they created. This is done by saving the user's `_id` into the Employee document. Whenever an employee route is called, the system checks if the `userId` decoded from the JWT matches the `user` field of the employee in the database. Cross-user access is actively blocked.

## Security Measures
- **Password Hashing:** Passwords are never saved in plain text. They are hashed using `bcrypt` before being saved to MongoDB.
- **JWT:** Used for secure communication and verifying logged-in users.
- **Helmet:** Used to set secure HTTP headers and protect against web vulnerabilities.
- **Rate Limiting:** Applied to login and signup routes to prevent brute-force attacks.
- **Input Validation:** Incoming data (like email formats, missing fields) is validated before processing.
- **Environment Variables:** Secrets like DB credentials and JWT keys are stored in `.env` and kept out of the source code.

## Logging and Error Handling
- **Logging:** Basic application events (like server startup, database connection, and errors) are logged locally to the console. Passwords and JWT secrets are intentionally excluded from logs for security.
- **Error Handling:** The API handles errors gracefully and returns proper HTTP status codes (200, 201, 204, 400, 401, 403, 404, 500) with JSON error messages.
