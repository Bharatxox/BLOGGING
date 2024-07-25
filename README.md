# Blogging Platform

A blogging platform built using Node.js, Express.js, and MongoDB.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Middleware](#middleware)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a simple blogging platform where users can sign up, create posts, and comment on posts. It uses Node.js and Express.js for the backend and MongoDB as the database.

## Features

- User authentication (sign up, login)
- Create, read, update, and delete posts
- Comment on posts
- Basic pagination and sorting for posts
- Middleware for logging requests and handling errors
- Authentication with JWT Token

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Bharatxox/BLOGGING.git
   cd your-repo
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Set up the MongoDB database:

   - Ensure MongoDB is installed and running.
   - Update the database connection string in `app.js`:
     ```javascript
     mongoose.connect("mongodb://localhost:27017/blogging", {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     });
     ```

4. Start the server:
   ```sh
   npm start
   ```

## Usage

- To start the server, run:
  ```sh
  npm start
  ```
- The server will be running on `http://localhost:1000`.

## API Endpoints

### User Endpoints

- **POST** `/api/v1/user/signup` - Sign up a new user
- **POST** `/api/v1/user/login` - Log in an existing user

### Post Endpoints

- **GET** `/api/v1/blog` - Get all posts (with optional filters, pagination, and sorting)
- **POST** `/api/v1/blog/create` - Create a new post
- **POST** `/api/v1/blog/update/:postId` - Update a post
- **DELETE** `/api/v1/blog/delete/:postId` - Soft delete a post

### Comment Endpoints

- **GET** `/api/v1/comment` - Get comments for a post
- **POST** `/api/v1/comment/create` - Create a new comment
- **POST** `/api/v1/comment/update/:commentId` - Update a comment
- **POST** `/api/v1/comment/delete/:commentId` - Soft delete a comment

## Models

### User Model

```javascript
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  mobileNo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  token: { type: String, default: "-" },
  bio: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
});
```
