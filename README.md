# DevCaps - Startup Ecosystem Platform

DevCaps is a full-stack web application built to connect startups, investors, and mentors in one place. We're making it easier for early-stage companies to find funding, guidance, and the resources they need to scale.

## 🌐 Live Demo

**Frontend**: [https://devcapsbyanurag.vercel.app](https://devcapsbyanurag.vercel.app)  
**Backend API**: [https://devcaps.onrender.com](https://devcaps.onrender.com)

## ✨ Key Features

### Public Features
- **Project Showcase** - Browse startup portfolios with detailed project information and images
- **Success Stories** - Auto-rotating testimonials from successful clients with images
- **Newsletter Subscription** - Email validation and subscription management
- **Contact Form** - Direct inquiry submission for potential clients
- **Responsive Design** - Fully responsive across mobile, tablet, and desktop

### Admin Dashboard (Protected)
- **JWT Authentication** - Secure admin login with HTTP-only cookies
- **Project Management** - Create, update, and delete projects with image uploads
- **Success Stories Management** - Add and manage client testimonials
- **Contact Queries** - View and manage contact form submissions
- **Newsletter Manager** - View subscribers and export to Excel
- **Image Cropper** - Built-in image cropping to 450x350 aspect ratio

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Easy Crop** - Image cropping functionality
- **Slick Carousel** - Project showcase slider

### Backend
- **Node.js + Express** - Server framework
- **MongoDB + Mongoose** - Database and ODM
- **JWT + bcryptjs** - Authentication and password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - HTTP-only cookie management

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
npm install
```

2. Create `.env` file:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

3. Start the server:
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
npm install
```

2. Create `.env` file (optional for local development):
```env
VITE_API_URL=http://localhost:3000
VITE_FRONTEND_URL=http://localhost:5173
```

3. Start the dev server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173)

## 🔐 Admin Access

Default admin credentials are created via the `createAdmin.js` script:
- Email: `admin@devcaps.com`
- Password: `admin123`

**⚠️ Change the password after first login!**

Access the admin dashboard at: `/admindashboard`

## 📁 Project Structure

```
DevCaps-FullStack-Webapplication/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── middlewares/     # Auth and upload middlewares
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes
│   │   └── utils/           # Helper utilities
│   ├── uploads/             # Uploaded images storage
│   ├── createAdmin.js       # Admin user creation script
│   └── index.js             # Server entry point
│
├── frontend/
│   ├── src/
│   │   ├── admin/           # Admin dashboard components
│   │   ├── API's/           # API service functions
│   │   ├── components/      # React components
│   │   │   ├── HomeComponent/   # Homepage sections
│   │   │   └── ProtectedRoute.jsx  # Auth guard
│   │   ├── Loader/          # Loading components
│   │   ├── App.jsx          # Main app component
│   │   ├── AppRoutes.jsx    # Route definitions
│   │   └── NwConfig.js      # API configuration
│   └── public/              # Static assets
```

## 🔑 Key Functionalities

### Authentication System
- JWT tokens stored in HTTP-only cookies (secure, not accessible via JavaScript)
- Automatic token verification on protected routes
- Session persistence across page refreshes
- Secure logout clearing cookies

### Image Upload & Cropping
- Client-side image cropping to 450x350 ratio
- Automatic resizing and compression
- Backend storage in `/uploads` directory
- Absolute URL generation for cross-environment compatibility

### Project Management
- CRUD operations for projects
- Real-time preview of uploaded images
- Form validation before submission
- Success/error alerts for user feedback

### Newsletter System
- Email validation (accepts any valid email domain)
- Duplicate prevention
- Excel export functionality
- Subscriber count tracking

### Success Stories
- Auto-rotating testimonials (2-second intervals)
- Image upload with cropping
- Navigation indicators
- Responsive layout

## 🌍 Deployment

### Frontend (Vercel)
- Automatic deployments from GitHub
- Environment variables set in Vercel dashboard
- Custom domain support

### Backend (Render)
- Web service deployment
- Environment variables configured in Render
- Static file serving enabled for uploads

## 📝 API Endpoints

### Public Routes
- `GET /api/projects` - Get all projects
- `GET /api/success-stories` - Get success stories
- `POST /api/contact` - Submit contact form
- `POST /api/subscribe` - Subscribe to newsletter

### Protected Routes (Require JWT)
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/success-stories` - Update success stories
- `POST /api/upload` - Upload image
- `GET /api/contact` - Get contact queries
- `GET /api/subscribe` - Get newsletter subscribers

### Auth Routes
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/verify` - Verify authentication

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 📧 Contact

For questions or support, please contact via the contact form on the website or open an issue on GitHub.

---

**Built with ❤️ for the startup ecosystem**
