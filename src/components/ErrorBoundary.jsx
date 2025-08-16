// ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error) {
    console.error('ErrorBoundary caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-red-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Đã xảy ra lỗi</h1>
            <p className="mt-2 text-gray-700">
              Có thể do công cụ dịch tự động (Google Translate). Vui lòng tắt dịch trong trình duyệt và tải lại trang.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Tải lại
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;