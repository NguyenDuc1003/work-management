import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function PageIsolator({ children, pageName }) {
  const [isReady, setIsReady] = useState(true); // Khởi tạo true để tránh flash loading
  const location = useLocation();

  useEffect(() => {
    // Đặt lại trạng thái khi đường dẫn thay đổi
    let timeout;
    setIsReady(false);
    timeout = setTimeout(() => setIsReady(true), 50); // Delay ngắn để tạo hiệu ứng

    return () => clearTimeout(timeout); // Dọn dẹp timer
  }, [location.pathname]);

  return (
    <div key={location.pathname} className="w-full h-full">
      {!isReady ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Đang tải {pageName}...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}