# 📚 Library Management System
### Full-Stack Web Application | Node.js | Express.js | MySQL

<p align="center">

  **A web-based Library Management System designed to simplify and organize library operations, including book management, user management, book issuing, returns, and fine management.**

</p>

<p align="center">

  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
  ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
  ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

</p>

---

## 📌 1. Project Overview

The **Library Management System** is a full-stack web application developed to manage and automate essential library operations through a centralized digital platform.

Traditional library management often involves manual record keeping, which can make book tracking, member management, issue and return operations, and fine calculations difficult to organize.

This project provides a digital solution that helps manage library resources efficiently through an interactive frontend, a Node.js and Express.js backend, and a MySQL relational database.

The application provides functionalities for managing books, users, issued books, publishers, categories, and fines.

## 🎯 2. Problem Statement

Managing library operations manually can lead to inefficient record maintenance, difficulty tracking book availability, errors in issue and return records, and challenges in maintaining fine information.

The objective of this project is to develop a centralized Library Management System that simplifies library operations, improves data organization, and provides an efficient way to manage library resources.

## 🎯 3. Project Objectives

- **Book Management:** Maintain and organize book records.
- **User Management:** Store and manage library user information.
- **Issue Management:** Maintain records of issued books.
- **Return Management:** Organize book return information.
- **Fine Management:** Maintain records of fines associated with library transactions.
- **Database Management:** Store and retrieve library information using MySQL.
- **Web Integration:** Connect the frontend with backend services through APIs.

## ✨ 4. Key Features

### 📖 Book Management
- Add and manage book records.
- View available book information.
- Organize books into categories.

### 👥 User Management
- Maintain library user records.
- Access user-related information.
- Organize member information.

### 📚 Issue and Return Management
- Maintain issued book records.
- Track book issue information.
- Manage return-related records.

### 💰 Fine Management
- Maintain fine records.
- Organize fine-related information.

### 📊 Dashboard
- Centralized interface for accessing library management modules.
- Organized navigation between different functionalities.

## 🛠️ 5. Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Frontend structure |
| CSS3 | Styling and layout |
| JavaScript | Frontend functionality |
| Node.js | Backend runtime environment |
| Express.js | Backend framework and API development |
| MySQL | Relational database |
| MySQL2 | Database connectivity |
| CORS | Cross-Origin Resource Sharing |
| dotenv | Environment variable management |
| Git | Version control |
| GitHub | Source code hosting |

## 🏗️ 6. System Architecture

The application follows a three-layer architecture.

```text
       USER
         |
         v
  PRESENTATION LAYER
    HTML / CSS / JS
         |
         v
   HTTP API REQUESTS
         |
         v
   APPLICATION LAYER
     NODE.JS
     EXPRESS.JS
         |
         v
    DATABASE LAYER
        MYSQL
         |
         v
   DATA RETRIEVAL /
   DATA MANAGEMENT
         |
         v
    API RESPONSE
         |
         v
    FRONTEND UI
```

### Architecture Explanation

**1. Presentation Layer**

The frontend is developed using HTML, CSS, and JavaScript. It provides the user interface for interacting with different library management functionalities.

**2. Application Layer**

Node.js and Express.js handle backend operations, process requests, and communicate with the MySQL database.

**3. Database Layer**

MySQL stores structured library information, including books, users, categories, publishers, issued books, and fines.

## 🗄️ 7. Database Design

The project uses a MySQL database named `gym_db`? 

Replace this with your actual database name if different.

The database contains the following major tables:

| Table | Description |
|---|---|
| users | Stores library user information |
| categories | Maintains book categories |
| publishers | Stores publisher details |
| books | Maintains book records |
| issued_books | Stores book issue and return records |
| fine | Maintains fine information |

These tables help organize library data and support different application operations.

## 📂 8. Project Structure

```text
LIBRARY_SYSTEM/
│
├── Backend/
│   ├── server.js
│   └── Backend files
│
├── Frontend/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── books.html
│   ├── issued.html
│   ├── fine.html
│   ├── users.html
│   ├── script.js
│   └── style.css
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

*The structure above is illustrative. Adjust filenames to match your actual project.*

## ⚙️ 9. Installation and Setup

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MySQL Server
- MySQL Workbench (optional)
- Visual Studio Code
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/mayuriaute73-glitch/Library-Management-System.git
```

### Step 2: Navigate to the Project Directory

```bash
cd LIBRARY_SYSTEM
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure MySQL Database

1. Open MySQL Workbench.
2. Create your library database.
3. Execute your database creation SQL script.
4. Configure the backend database connection.

### Step 5: Configure Environment Variables

Create a `.env` file in the appropriate backend configuration directory.

Example:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database_name
DB_PORT=3306
```

Use the exact environment variable names expected by your backend code.

**Important:** Never upload your `.env` file or database credentials to GitHub.

### Step 6: Start the Backend Server

Run the backend entry-point file using Node.js.

For example, if your backend entry point is `Backend/server.js`:

```bash
node Backend/server.js
```

Alternatively, configure an npm start script in `package.json` according to your actual server entry point.

### Step 7: Open the Frontend

Open `Frontend/index.html` using your browser or a local development server.

Ensure the backend server is running and the frontend API configuration points to the correct backend address.

## 🔄 10. Application Workflow

```text
       USER
         |
         v
    LOGIN / ACCESS
         |
         v
      DASHBOARD
         |
         v
  SELECT FUNCTIONALITY
         |
    +----+----+
    |    |    |
    v    v    v
  BOOKS USERS FINES
    |
    v
 ISSUE / RETURN
    |
    v
 BACKEND PROCESSING
    |
    v
 MYSQL DATABASE
    |
    v
 UPDATED RECORDS
```

## 🚀 11. Advantages

- Reduces manual library record management.
- Centralizes library information.
- Improves organization of book records.
- Simplifies issue and return tracking.
- Provides structured database management.
- Uses a modular frontend and backend architecture.
- Demonstrates full-stack web development concepts.

## 🔮 12. Future Enhancements

The project can be extended with the following features:

- Role-based authentication for administrators and library members.
- Search and filter functionality for books.
- Automated fine calculation.
- Book availability tracking.
- Email notifications for due dates and overdue books.
- Book reservation functionality.
- Dashboard analytics and reports.
- Cloud database integration.
- Improved security and automated testing.

## 📸 13. Application Screenshots

Add actual screenshots of your application below.

### Login Page

<!-- Add login page screenshot here -->

### Dashboard

<!-- Add dashboard screenshot here -->

### Book Management

<!-- Add book management screenshot here -->

### Issue and Fine Management

<!-- Add issue and fine management screenshots here -->

## 👩‍💻 14. Author

**Mayuri Aute**

B.E. – Artificial Intelligence and Machine Learning

GitHub: [@mayuriaute73-glitch](https://github.com/mayuriaute73-glitch)

---

## ⭐ Acknowledgements

This project was developed as part of my journey in learning full-stack web development, backend programming, database management, and software development.

If you find this project interesting, consider giving the repository a ⭐.

**Thank you for exploring my project!**