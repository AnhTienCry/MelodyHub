# MelodyHub

Ứng dụng Full-stack với React + Vite (Frontend) và Node.js + Express + MongoDB (Backend)

## 🚀 Khởi động dự án

### Backend (http://localhost:5000)
```bash
cd Backend
npm run dev
```

### Frontend (http://localhost:3000)
```bash
cd Frontend
npm run dev
```

## 📦 Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Axios

### Backend
- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Express Validator
- Rate Limiting

## 🔗 API Connection

Frontend tự động kết nối với Backend qua:
- Direct API calls: `http://localhost:5000`
- Proxy (development): `/api/*` → `http://localhost:5000/api/*`

## 📁 Cấu trúc thư mục

```
MelodyHub/
├── Frontend/
│   ├── src/
│   │   ├── config/       # API configuration
│   │   ├── services/     # API services
│   │   └── ...
│   └── .env
│
└── Backend/
    ├── src/
    │   ├── config/       # Database config
    │   ├── middleware/   # Express middleware
    │   ├── models/       # MongoDB models
    │   ├── routes/       # API routes
    │   └── controllers/  # Business logic
    └── .env
```

## 🔧 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/melodyhub
NODE_ENV=development
JWT_SECRET=your-secret-key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```
