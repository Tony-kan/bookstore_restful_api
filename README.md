# Bookstore API

This is a RESTful API for a bookstore application built with Node.js and Express. The API includes authentication and authorization features and provides endpoints for user registration, login, logout, and managing books.

## Features

- User registration, login, and logout
- Authentication and authorization using JWT
- CRUD operations for books
- Pagination for retrieving books
- Image upload to Cloudinary

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Cloudinary
- CORS
- Cookie Parser

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Tony-kan/bookstore-api.git
    cd bookstore-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

4. Start the server:
    ```bash
    npm start
    ```

## API Endpoints

### Authentication

- **Register**
    - `POST /api/v1/auth/register`
    - Request body: `{ "username": "string", "email": "string", "password": "string" }`
    - Response: `{ "success": true, "message": "User registered successfully", "data": { "user": "user_object", "token": "jwt_token" } }`

- **Login**
    - `POST /api/v1/auth/login`
    - Request body: `{ "email": "string", "password": "string" }`
    - Response: `{ "success": true, "message": "User logged in successfully", "data": { "user": "user_object", "token": "jwt_token" } }`

- **Logout**
    - `POST /api/v1/auth/logout`
    - Response: `{ "success": true, "message": "User logged out successfully" }`

### Books

- **Create Book**
    - `POST /api/v1/books`
    - Request body: `{ "title": "string", "caption": "string", "bookCover": "string", "rating": "number" }`
    - Response: `{ "success": true, "message": "Book created successfully", "data": "book_object" }`

- **Get All Books**
    - `GET /api/v1/books`
    - Query parameters: `page`, `limit`
    - Response: `{ "success": true, "message": "Books retrieved successfully", "data": "books_array", "totalBooks": "number", "currentPage": "number", "totalPages": "number" }`

- **Get Book by ID**
    - `GET /api/v1/books/:id`
    - Response: `{ "success": true, "data": "book_object" }`

- **Search Books**
    - `GET /api/v1/books/search`
    - Query parameters: `title`, `caption`, `rating`
    - Response: `{ "success": true, "data": "books_array" }`

- **Update Book**
    - `PATCH /api/v1/books/:id`
    - Request body: `{ "title": "string", "caption": "string", "bookCover": "string", "rating": "number" }`
    - Response: `{ "success": true, "message": "Book updated successfully", "data": "book_object" }`

- **Delete Book**
    - `DELETE /api/v1/books/:id`
    - Response: `{ "success": true, "message": "Book with id : book_id deleted successfully" }`

## License

This project is licensed under the MIT License.