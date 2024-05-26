# Mern Twitter Clone

## Description

This is a Twitter clone application built using Node.js, Express.js, and MongoDB for the backend, and React.js for the frontend. The application allows users to register, login, post tweets, and view tweets from other users. [X-Clone](https://x-clones.netlify.app/)

## Features

- User authentication (register, login, logout)
- JWT-based authentication
- Secure cookie handling
- Create, read, update, and delete (CRUD) tweets
- Follow and unfollow users
- Real-time notifications
- Like and bookmark tweets
- Display tweets from followed users

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** React.js, Axios
- **Middleware:** JWT, bcrypt, cookie-parser, cors, morgan
- **Deployment:** Netlify (Frontend), onrender (Backend) hosting service
## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB installed and running

## Installation

### Backend

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/mern-twitter-clone.git
   cd mern-twitter-clone
   
2. Install backend dependencies
   ```bash
   cd server
   npm install

3. Create a .env file in the server directory and add the following environment variables
   ```bash
   PORT=8080
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   DEV_MODE=development
   FRONTEND_URL=http://localhost:3000

4. Start the backend server
   ```bash
   nodemon || node app.js

### Frontend

1. Navigate to the client directory

   ```bash
   cd client
2. Install frontend dependencies

   ```bash
   npm install

3. Create a .env file in the client directory and add the following

   ```bash
   REACT_APP_BASE_URL=http://localhost:8080/api/v1
   
4. Start the frontend development server

   ```bash
   npm start

## Contributing

Contributions are welcome! If you'd like to contribute to ApexBooking Health, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please contact me at harismohanty8658gmail.com.

Thank you for using X Clone!
