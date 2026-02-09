# Zomato Reels 🍔🎬

## Overview

**Zomato Reels** is a short‑video based food discovery platform where restaurants and food partners can upload engaging food reels to showcase their dishes, attract customers, and increase visibility. Users can browse reels, explore restaurant profiles, and interact with content through likes and comments.

This project is designed to simulate a modern food discovery experience similar to social media reels integrated with restaurant listings.

---

## Features

* Upload food reels (video upload support)
* Restaurant / Food Partner profile management
* Browse reels feed
* Like and interact with reels
* Secure authentication using JWT
* Responsive modern UI
* Dashboard for food partners to manage uploads

---

## Tech Stack

**Frontend:**

* React.js
* Tailwind CSS
* Axios

**Backend:**

* Node.js
* Express.js
* MongoDB / Mongoose
* JWT Authentication
* Multer (file upload)

**Other Services:**

* ImageKit / Cloud storage for video hosting

---

## Installation

```bash
# Clone repository
git clone <repo-url>

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

## Environment Variables

Create a `.env` file in backend folder and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_endpoint
```

---

## Run Project

```bash
# backend
npm run dev

# frontend
npm run dev
```

---

## Project Structure

```
frontend/
backend/
   controllers/
   models/
   routes/
   middleware/
```

---

## Future Improvements

* Comments system
* Follow restaurants
* Reel recommendation algorithm
* Notifications system
* Admin moderation panel

---

## Author

**Ayan Hussain**

---

## License

This project is open-source and available for learning purposes.
