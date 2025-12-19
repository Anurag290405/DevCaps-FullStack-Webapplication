# Authentication Setup

## Backend Setup

### 1. Create Admin User

Run this command to create the default admin user:

```bash
cd backend
node createAdmin.js
```

Default credentials:
- Email: `admin@devcaps.com`
- Password: `admin123`

**⚠️ Important: Change the password after first login!**

### 2. Environment Variables

Ensure your `.env` file has:
```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
NODE_ENV=production  # For deployed environments
```

### 3. Start Backend

```bash
npm start
```

## Frontend Setup

### 1. Configure API URL

Update `frontend/src/NwConfig.js`:
- For local development: `export const API_URL = "http://localhost:3000";`
- For production: `export const API_URL = "https://devcaps.onrender.com";`

### 2. Start Frontend

```bash
cd frontend
npm run dev
```

## How Authentication Works

### Backend
1. **Login**: POST `/api/auth/login` - Returns JWT in HTTP-only cookie
2. **Verify**: GET `/api/auth/verify` - Checks if user is authenticated
3. **Logout**: POST `/api/auth/logout` - Clears the JWT cookie

### Protected Routes
All admin routes require authentication:
- Projects: POST, PUT, DELETE
- Success Stories: POST
- Contact Queries: GET
- Newsletter: GET
- Image Upload: POST

Public routes (no auth required):
- Projects: GET
- Success Stories: GET
- Contact: POST
- Subscribe: POST

### Frontend
1. **Login Page**: `/admin` - Enter credentials
2. **Protected Routes**: `/admindashboard` - Only accessible when authenticated
3. **Auto-redirect**: Unauthenticated users redirected to `/admin`
4. **Session Persistence**: Cookie-based, persists across page refresh

## Security Features

✅ JWT stored in HTTP-only cookies (not localStorage)
✅ CORS enabled with credentials for specific origins
✅ Passwords hashed with bcryptjs
✅ 24-hour token expiration
✅ Secure cookies in production (sameSite=none, secure=true)
✅ Admin routes protected with middleware

## Deployment Notes

### Render (Backend)
- Set environment variable `NODE_ENV=production`
- Ensure `JWT_SECRET` is set in Render dashboard
- CORS is configured for `https://devcapsbyanurag.vercel.app`

### Vercel (Frontend)
- Configure `API_URL` to point to Render backend
- No additional configuration needed
- Axios automatically sends cookies with `withCredentials: true`

## Troubleshooting

**Login fails with 401**:
- Check admin user exists (run `createAdmin.js`)
- Verify credentials are correct
- Check backend logs for errors

**Session not persisting**:
- Ensure `withCredentials: true` in all API calls
- Check CORS configuration includes credentials
- Verify cookie is being set in browser DevTools

**CORS errors**:
- Ensure frontend origin is in CORS whitelist
- Check `credentials: true` in CORS config
- Verify API_URL matches backend URL
