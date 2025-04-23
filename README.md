# BookVerse API

BookVerse is a RESTful API for an online bookstore. It supports user registration, authentication, book management, and wishlist features. Built using Node.js, Express, and MongoDB, this backend API provides the core functionality for a book discovery and wishlist application.

---

## API Deployment: 

https://bookverse-api.onrender.com/api


---

## Postman Collection

A Postman collection (First collection and Second collection json files) with all API requests and test scripts are included under the “postman” folder

### How to Use It:
1. Download the file from this repo.
2. Open Postman.
3. Click **Import** → Upload the `.json` file.
4. You will see a collection with:
   -  Predefined requests (GET, POST, PUT, DELETE) , for Users, Books and Wishlist
   - Endpoint descriptions
   - Test scripts (status code, response shape)


---

## Features

### Users
- `POST /api/users/register` – Register a new user
- `POST /api/users/login` – Authenticate user and return token
- `GET /api/users` – Fetch all users (public)
- `GET /api/users/:id` – Fetch a specific user (protected)
- `PUT /api/users/:id` – Update user info (protected)

### Books
- `GET /api/books` – Fetch all books
- `GET /api/books/:id` – Get book by ID
- `POST /api/books` – Add a new book
- `PUT /api/books/:id` – Update book details
- `DELETE /api/books/:id` – Delete a book

### Wishlist
- `GET /api/wishlist/:userId` – Get a user's wishlist (protected)
- `POST /api/wishlist` – Add a book to wishlist
- `DELETE /api/wishlist/:userId/:bookId` – Remove book from wishlist

---

## Technologies Used

- **Backend**: Node.js + Express
- **Database**: MongoDB (via MongoDB Atlas)
- **Authentication**: JWT
- **Testing**: Postman (Collection + Test Scripts)
- **Deployment**: Render

---

## Authentication

Most routes are **protected** using JWT-based authentication.

**How it works:**
- After login, the user is given a token in the response.
- This token must be included in requests that require authentication:
   Authorization: Bearer <your_token_here>
