Here is a more detailed README file for your **Rescue Radar** project to add to GitHub:

---

# Rescue Radar

**Rescue Radar** is a web-based platform designed to help animal rescuers in Karnataka receive and respond to reports of injured animals efficiently. The platform allows anyone to report an injured animal, while only rescuers are required to log in to manage and respond to the cases.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Anonymous Reporting:** Users can report injured animals without needing to log in.
- **Rescuer Login:** Only rescuers are required to log in to manage and respond to the reports.
- **Case Management:** Rescuers can view, update, and resolve reported cases.
- **Real-time Notifications:** Rescuers are notified of new reports in real-time to ensure quick responses.
- **Search and Filter:** Rescuers can filter reports based on location, status, and type of animal.

## Technologies Used

- **Frontend:** 
  - HTML, CSS, JavaScript (React.js or another framework of your choice)
- **Backend:**
  - Node.js with Express.js
- **Database:**
  - MongoDB (for storing reports, rescuer details, and case statuses)
- **Authentication:** 
  - JWT (JSON Web Tokens) for secure rescuer login
- **Environment Variables:**
  - dotenv for storing sensitive data such as API keys and database credentials.

## Project Setup

### Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **MongoDB**: Set up either a local MongoDB instance or use MongoDB Atlas (cloud version).
  
### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rescue-radar.git
   ```

2. Navigate to the backend directory:
   ```bash
   cd rescue-radar/backend
   ```

3. Install the necessary dependencies:
   ```bash
   npm install
   ```

4. Set up MongoDB:
   - Create a MongoDB instance (use MongoDB Atlas or set up a local MongoDB server).
   - Create a `.env` file in the backend directory and add the following environment variables:
     ```
     MONGO_URI=mongodb://<your_mongo_connection_string>
     JWT_SECRET=<your_jwt_secret>
     ```

5. Run the backend server:
   ```bash
   npm start
   ```

   This will start the server on port `5000` (or whatever port is defined in your configuration).

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd rescue-radar/frontend
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Run the frontend:
   ```bash
   npm start
   ```

   This will start the frontend on `http://localhost:3000`.

### Running the Application

Once both the backend and frontend are running, you can access the application at:

- Frontend: `http://localhost:3000`
- Backend (API): `http://localhost:5000`

## API Endpoints

### User Endpoints

- **POST /api/users/register**
  - Register a new user (rescuer).
  - **Body:**
    ```json
    {
      "username": "rescueAdmin",
      "email": "admin@example.com",
      "password": "securePassword123"
    }
    ```

- **POST /api/users/login**
  - Log in a rescuer and receive a JWT token.
  - **Body:**
    ```json
    {
      "email": "admin@example.com",
      "password": "securePassword123"
    }
    ```
  - **Response:**
    ```json
    {
      "token": "<JWT_TOKEN>"
    }
    ```

### Report Endpoints

- **POST /api/reports**
  - Create a new report (for injured animals).
  - **Body:**
    ```json
    {
      "animalType": "Dog",
      "location": "Karnataka",
      "description": "Injured leg",
      "reportedBy": "John Doe"
    }
    ```

- **GET /api/reports**
  - Get all reports.
  - **Response:**
    ```json
    [
      {
        "_id": "reportId",
        "animalType": "Dog",
        "location": "Karnataka",
        "description": "Injured leg",
        "status": "pending"
      }
    ]
    ```

- **PUT /api/reports/:id**
  - Update a report status (for rescuers only).
  - **Body:**
    ```json
    {
      "status": "resolved"
    }
    ```

## Authentication

- **JWT Authentication**: Rescuers are authenticated using JWT tokens.
- **Registration & Login**: Rescuers can register and log in through the `/api/users/register` and `/api/users/login` endpoints. Once logged in, they will receive a JWT token, which should be included in the `Authorization` header of any protected request.
  
  Example for sending the token in the headers:
  ```bash
  Authorization: Bearer <JWT_TOKEN>
  ```

## Database Schema

**Reports Schema:**

- `_id`: Unique identifier for each report (MongoDB ObjectId).
- `animalType`: Type of animal (e.g., Dog, Cat).
- `location`: The location of the incident.
- `description`: Details of the injury or situation.
- `status`: The current status of the report (e.g., pending, resolved).
- `reportedBy`: The person who reported the injury.

**Users Schema (Rescuers):**

- `_id`: Unique identifier for each rescuer (MongoDB ObjectId).
- `username`: Username of the rescuer.
- `email`: Email address (used for login).
- `password`: Hashed password (for security).
- `role`: Role of the user (default to "rescuer").

## Contributing

We welcome contributions to improve the Rescue Radar platform. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to modify any section according to your specific project needs. If you have any additional information or sections you'd like to include, just let me know!
