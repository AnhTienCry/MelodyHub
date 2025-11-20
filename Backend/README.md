# MelodyHub Backend

Backend API cho MelodyHub được xây dựng với Node.js, Express, MongoDB và TypeScript.

## Cài đặt

```bash
npm install
```

## Cấu hình

Tạo file `.env` với các biến môi trường:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/melodyhub
NODE_ENV=development
```

## Chạy ứng dụng

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Production
```bash
npm start
```

## Cấu trúc thư mục

```
src/
├── config/         # Cấu hình database và các config khác
├── controllers/    # Controllers xử lý logic
├── models/        # MongoDB models
├── routes/        # API routes
└── index.ts       # Entry point
```
