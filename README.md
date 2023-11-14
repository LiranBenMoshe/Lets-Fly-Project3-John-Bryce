**# Lets Fly - Final Project at John Bryce Academy by Liran Ben Moshe**

**## Project Overview**

"Lets Fly" is the final project developed by Liran Ben Moshe as part of the full-stack development course at John Bryce Academy. It provides a seamless vacation planning and management system with distinct user and admin interfaces.

**## User UI**

- **User Registration and Login System:**
  - Users can register and log in securely to access personalized features.

- **Follow/Unfollow Vacations:**
  - Intuitive UI for users to follow and unfollow vacations.
  - Streamlined interface for a user-friendly experience.

- **Display Followed Vacations:**
  - Easily view and manage followed vacations through a user-friendly layout.

**## Admin UI**

- **Exclusive Admin Panel:**
  - Admins have access to a restricted admin panel for enhanced control.
  
- **Admin Capabilities:**
  - Add, delete, and edit vacation details for efficient management.

- **Reports Page:**
  - Visual representation of vacation data through charts for comprehensive insights.

**## Technologies Used**

- **Frontend:**
  - React with TypeScript for a robust and scalable user interface.
  - State management handled by Redux for efficient data flow.

- **Backend:**
  - Express and Node.js for a powerful and responsive server.
  - Utilizes CORS for enhanced security and communication with the frontend.
  - Integrates Uuid for unique identifiers and Express File Upload for efficient file handling.

- **Security:**
  - Implements JSON Web Token (JWT) for server-side security and seamless auto-login.

**## API Testing with Postman**

- The Postman collection for API testing is available in the `postman` directory. Import this collection into Postman for easy testing and interaction with the API.

  1. Open Postman.
  2. Click on "Import" in the top left corner.
  3. Choose "File" and select the `postman/vacations-website.postman_collection.json` file.

  Now you have access to pre-configured requests for testing your API endpoints.

**## Database Setup**

1. **Copy the SQL File:**
   Place your `vacations-website.sql` file in the `xampp/mysql/data` directory. This is where XAMPP usually looks for SQL files.

2. **Start XAMPP:**
   Start your XAMPP server, including the MySQL and Apache services.

3. **Access phpMyAdmin:**
   Open your web browser and navigate to [http://localhost/phpmyadmin/](http://localhost/phpmyadmin/).

4. **Create a Database:**
   Create a new database in phpMyAdmin with a name similar to `vacations-website` or any name you prefer.

5. **Import the SQL File:**
   - Click on the database you just created.
   - Go to the "Import" tab.
   - Click on the "Choose File" button and select your `vacations-website.sql` file.
   - Click "Go" to start the import process.

6. **Verify:**
   Check your database to ensure that the tables and data have been imported successfully.


**Getting Started**

Before running the project, make sure to install the necessary dependencies for both the backend and frontend.

# Backend
## Navigate to the backend directory:
cd backend

## Install dependencies:
npm install

## Start the backend server:
npm start

# Frontend
## Navigate to the frontend directory:
cd frontend

## Install dependencies:
npm install

## Start the frontend development server:
npm start

**Users Information For Login:**

Admin:

email: admin@gmail.com
Password: admin123

User:

email: user@gmail.com
Password: user123

The project should open up on http://localhost:3000/ and load up!
