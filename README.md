
# TodoFlow - Modern Task Management Application

A full-stack MERN application with TypeScript, featuring user authentication, CRUD operations, and a modern UI built with React, shadcn/ui, and Tailwind CSS.

## 🚀 Features

### Frontend
- **Modern UI**: Built with React, TypeScript, shadcn/ui, and Tailwind CSS
- **Authentication**: JWT-based authentication with login/register
- **Todo Management**: Create, read, update, delete todos
- **Filtering**: Filter todos by status (all, completed, pending)
- **Real-time Updates**: Optimistic UI updates with error handling
- **Responsive Design**: Mobile-friendly responsive layout
- **Toast Notifications**: User feedback for all actions
- **Protected Routes**: Route protection for authenticated users
- **State Management**: Zustand for efficient state management

### Backend
- **RESTful API**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Validation**: Input validation using express-validator
- **Security**: Helmet, CORS
- **Error Handling**: Comprehensive error handling middleware
- **Logging**: Morgan for request logging

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui component library
- Framer Motion for animations
- Zustand for state management
- Axios for API calls

### Backend
- Node.js with Express.js
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Helmet for security headers
- CORS for cross-origin requests

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Aryankarma/todoflow-firstlist-assignment
cd todoflow
```

2. **Install frontend dependencies**
```bash
cd ui
npm install
```

3. **Install backend dependencies**
```bash
cd server
npm install
```

4. **Environment Setup**
The backend `.env` file is already configured with the provided MongoDB URI:
```
MONGODB_URI=mongodb+srv://<yourusername>:<somepassword>@todocluster.ywgt6y0.mongodb.net/todoflow
JWT_SECRET=super-secret
JWT_EXPIRE=7d
NODE_ENV=development
PORT=5000
```

5. **Start the development servers**

**Backend (Terminal 1):**
```bash
cd server
npm run dev
```

**Frontend (Terminal 2):**
```bash
cd ui
npm run dev
```

The application will be available at:
- Frontend: http://localhost:8080
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/health

## 📱 Usage

1. **Registration**: Create a new account with email and password
2. **Login**: Sign in with your credentials
3. **Dashboard**: Access your personal todo dashboard
4. **Create Todos**: Add new tasks with title and optional description
5. **Manage Todos**: Edit, delete, or mark todos as complete
6. **Filter**: View all, completed, or pending todos
7. **Logout**: Securely sign out of your account

## 🔒 Security Features

- Password hashing with bcrypt (salt rounds: 12)
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- Security headers with Helmet
- CORS configuration
- Error handling without sensitive data exposure

## 🎨 UI/UX Features

- Clean, modern interface
- Smooth animations and transitions
- Responsive design for all devices
- Toast notifications for user feedback
- Loading states and error handling
- Intuitive navigation and user flows
- Accessible design patterns

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Todos (Protected)
- `GET /api/todos` - Get all user todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion

## 🏗️ Project Structure

```
todoflow/
├── ui/                # Frontend source
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── hooks/             # Custom hooks
│   │   ├── lib/               # Utilities and configurations
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   └── types/             # TypeScript types
|   |   └── package.json
├── server/                # Backend source
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   └── types/         # TypeScript types
│   └── package.json
|   readme.md
```

## 🚀 Deployment

### Frontend
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform

### Backend
1. Build the project: `cd server && npm run build`
2. Deploy to your server with environment variables
3. Ensure MongoDB connection is configured
4. Update CORS origins for production


### Images


