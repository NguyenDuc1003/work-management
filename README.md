# Work Management System 🚀

Hệ thống quản lý công việc hiện đại được xây dựng với React + Vite, cung cấp giao diện người dùng đẹp mắt và trải nghiệm mượt mà.

## ✨ Tính năng chính

- 🔐 **Xác thực người dùng**: Đăng nhập/đăng ký với giao diện hiện đại
- 📋 **Quản lý task**: Tạo, chỉnh sửa, theo dõi công việc
- 👥 **Quản lý người dùng**: Phân quyền và quản lý thành viên
- 🏢 **Quản lý phòng ban**: Tổ chức theo cơ cấu công ty
- 💬 **Chat room**: Giao tiếp nội bộ
- 🎯 **Project management**: Quản lý dự án một cách hiệu quả
- 🎨 **UI/UX hiện đại**: Giao diện đẹp với Tailwind CSS
- 📱 **Responsive**: Hoạt động tốt trên mọi thiết bị

## 🛠️ Công nghệ sử dụng

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Icons**: React Icons
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: React Hooks

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 16+
- npm hoặc pnpm

### Hướng dẫn cài đặt

1. **Clone repository**:
   ```bash
   git clone <repository-url>
   cd work-management-system
   ```

2. **Cài đặt dependencies**:
   ```bash
   # Sử dụng npm
   npm install
   
   # Hoặc sử dụng pnpm
   pnpm install
   ```

3. **Chạy development server**:
   ```bash
   # Sử dụng npm
   npm run dev
   
   # Hoặc sử dụng pnpm
   pnpm dev
   ```

4. **Mở trình duyệt** và truy cập `http://localhost:5173`

## 📁 Cấu trúc dự án

```
src/
├── api/                 # API calls và cấu hình axios
├── components/          # React components
│   ├── ui/             # UI components tái sử dụng
│   └── ...             # Feature components
├── hooks/              # Custom React hooks
├── lib/                # Utilities và helpers
├── pages/              # Page components
├── services/           # Business logic services
├── globals.css         # Global styles
└── main.jsx           # Entry point
```

## 🔧 Scripts có sẵn

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run preview` - Preview production build
- `npm run lint` - Chạy ESLint

## 🎨 Tính năng giao diện

- **Gradient backgrounds**: Màu sắc đẹp mắt
- **Glassmorphism effects**: Hiệu ứng thủy tinh hiện đại
- **Smooth animations**: Chuyển động mượt mà
- **Interactive components**: Thành phần tương tác cao
- **Dark/Light theme**: Hỗ trợ chủ đề sáng/tối

## 📱 Responsive Design

Ứng dụng được thiết kế responsive, hoạt động tốt trên:
- 💻 Desktop (1024px+)
- 📱 Tablet (768px - 1024px)
- 📱 Mobile (< 768px)

## 🔐 Authentication

Hệ thống xác thực bao gồm:
- Đăng nhập với username/password
- Token-based authentication
- Tự động lưu trữ thông tin người dùng
- Route protection

## 🚧 Đang phát triển

- [ ] Real-time notifications
- [ ] File upload functionality
- [ ] Advanced reporting
- [ ] Mobile app
- [ ] Integration với các API bên ngoài

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Dự án này được phát hành dưới [MIT License](LICENSE).

## 📞 Liên hệ

- Email: your-email@example.com
- Website: your-website.com

---

Được tạo với ❤️ bằng React + Vite
