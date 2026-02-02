# Wonderlust | Hotel Listing Web App

[Live Demo](https://wunderlust-i9vy.onrender.com/)

## Features

- **User Authentication**: Sign up, log in, log out, and secure user sessions using JWT.
- **Hotel Listings**: View hotels with details like location, description, and price.
- **Review System**: Leave and view reviews on hotel listings.
- **Add Hotels**: Users can list their own hotels by providing necessary details and location.
- **Location Mapping**: Integrated with Mapbox to show the hotel’s location.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.

## Tech Stack

- **Frontend**: React.js, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose for schema management)
- **Authentication**: JWT-based authentication
- **Maps Integration**: Mapbox API

## Preview of the Site

![Screenshot (720)](https://github.com/user-attachments/assets/270762e8-caa8-4ad8-9c70-b2c3cb268e9b)
![Screenshot (721)](https://github.com/user-attachments/assets/c70405bf-161a-4156-b9d4-b0936bb69719)
![Screenshot (722)](https://github.com/user-attachments/assets/31ac387e-d1fa-4d37-984f-68a5ea95a1e9)
![Screenshot (723)](https://github.com/user-attachments/assets/4c1eb2d5-1f7c-4b21-b03f-7ed92305c0c7)

## Getting Started

Here's a step-by-step guide for using the Wonderlust project locally.

### Prerequisites

- Node.js (v14.x or higher)
- MongoDB (Local or Atlas)
- Git
- Mapbox API Key

### Installation

1. **Clone the Project**

   ```bash
   git clone https://github.com/your-username/wonderlust.git
   cd wonderlust
   ```

2. **Install Dependencies**

   Backend:
   ```bash
   cd backend
   npm install
   ```

   Frontend:
   ```bash
   cd frontend
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the `backend` folder:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   MAP_API_KEY=your_mapbox_api_key
   ```

4. **Start MongoDB**

   Ensure your MongoDB server is running (`mongod`) or you are connected to Atlas.

5. **Start the Application**

   Backend (runs on http://localhost:5000):
   ```bash
   cd backend
   npm start
   ```

   Frontend (runs on http://localhost:3000):
   ```bash
   cd frontend
   npm start
   ```

### Usage

1. **User Authentication**: Sign up or log in to access full features.
2. **Hotel Listing**: Browse available hotels.
3. **Reviews**: Add reviews to hotels you have visited.
4. **Location Mapping**: View hotel locations on the map.
5. **Create Listings**: List your own hotels.

### Deployment

To deploy:
- **Backend**: Render, Heroku, etc.
- **Frontend**: Vercel, Netlify, etc.
