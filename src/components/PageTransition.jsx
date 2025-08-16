import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsTransitioning(true);
    timeoutRef.current = setTimeout(() => setIsTransitioning(false), 200);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [location.pathname]);

  return { isTransitioning };
}

export function PageTransition({ children }) {
  const { isTransitioning } = usePageTransition();
  const location = useLocation();

  if (isTransitioning) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  return <div key={location.pathname}>{children}</div>;
}