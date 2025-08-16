import { useNavigate } from 'react-router-dom'
import { FaLock, FaHome, FaArrowLeft } from 'react-icons/fa'

const UnauthorizedPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-purple-600 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/20 backdrop-blur-lg rounded-2xl p-8 text-center shadow-xl border border-white/30">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-6">
          <FaLock className="text-white text-3xl" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-4">
          Không có quyền truy cập
        </h1>

        {/* Description */}
        <p className="text-white/80 mb-8 leading-relaxed">
          Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên 
          để được cấp quyền phù hợp.hoặc liên hệ tới email Ducmvb@gmail.com
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-300 hover:scale-105"
          >
            <FaArrowLeft />
            Quay lại
          </button>
          
          <button
            onClick={() => navigate('/app/tasks')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 hover:scale-105"
          >
            <FaHome />
            Về trang chủ
          </button>
        </div>

        {/* Additional info */}
        <div className="mt-8 p-4 bg-white/10 rounded-xl">
          <p className="text-white/70 text-sm">
            <strong>Mã lỗi:</strong> 403 - Forbidden
          </p>
        </div>
      </div>
    </div>
  )
}

export default UnauthorizedPage
