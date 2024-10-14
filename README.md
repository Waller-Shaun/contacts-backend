# Contacts Management Backend

This repository contains the backend code for the Contacts Management Application. The backend is built using **Node.js** and **Express**, with **MySQL** for database management. It provides RESTful APIs to handle basic contact management functions such as creating, updating, deleting, and retrieving contacts.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Database Setup](#database-setup)
5. [Running the Server](#running-the-server)
6. [API Endpoints](#api-endpoints)
7. [Deployment (Optional)](#deployment-optional)
8. [License](#license)

## Introduction
This backend is part of the Contacts Management System, providing a RESTful API to manage contacts. It includes functionalities to create, update, delete, and retrieve contact information. The backend communicates with a MySQL database for persistent storage.

## Features
- **Add Contact**: Create a new contact with a name and phone number.
- **Modify Contact**: Update an existing contact.
- **Delete Contact**: Remove a contact from the database.
- **Retrieve Contacts**: Fetch all stored contacts.

## Installation

### Prerequisites
- **Node.js** and **npm** should be installed on your machine.
- **MySQL** should be installed and running.

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/contacts-backend.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd contacts-backend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up the environment variables**:
   Create a `.env` file in the root directory with the following content:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=contacts_db
   PORT=3000
   ```

5. **Set up the MySQL database**:
   Follow the instructions in the **Database Setup** section.

## Database Setup

1. **Create a new database** in MySQL:
   ```sql
   CREATE DATABASE contacts_db;
   ```

2. **Create the `contacts` table**:
   ```sql
   CREATE TABLE contacts (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     phone VARCHAR(50) NOT NULL
   );
   ```

3. Ensure the database credentials in the `.env` file match your MySQL configuration.

## Running the Server

Once the database is set up, you can start the server:

```bash
node index.js
```

The server will run on `http://localhost:3000` by default.

## API Endpoints

Here are the available API endpoints:

### 1. Get All Contacts
- **Endpoint**: `GET /contacts`
- **Description**: Retrieves a list of all contacts.
- **Response**: A JSON array of contact objects.

### 2. Add a New Contact
- **Endpoint**: `POST /contacts`
- **Body**:
   ```json
   {
     "name": "张三",
     "phone": "12345677890"
   }
   ```
- **Response**: The newly created contact.

### 3. Modify an Existing Contact
- **Endpoint**: `PUT /contacts/:id`
- **Body**:
   ```json
   {
     "name": "李四",
     "phone": "98765433210"
   }
   ```
- **Response**: The updated contact.

### 4. Delete a Contact
- **Endpoint**: `DELETE /contacts/:id`
- **Response**: A success message.

## Deployment (Optional)

If you wish to deploy this backend to a cloud server (e.g., **Alibaba Cloud ECS**):

1. **Set up Node.js on your server**:
   - SSH into your cloud server and install Node.js and npm.
   - Install MySQL on the cloud server.

2. **Upload your backend code** to the cloud server using Git or SCP.

3. **Configure the environment**:
   - Set up MySQL on the server and configure the `.env` file with the correct database and server details.

4. **Run the backend**:
   - Start the backend with `node index.js` or use a process manager like **PM2** to keep it running.

## License
This project is licensed under the MIT License.

