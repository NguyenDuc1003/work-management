"use client"

import { useState, useEffect } from "react"
import { login, getUserInfo } from '../api/authApi'
import { saveToken, saveUser } from "../services/authService"
import { useNavigate } from "react-router-dom"
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSpinner, FaGoogle, FaFacebook, FaGithub } from "react-icons/fa"
import { HiSparkles } from "react-icons/hi"

const LoginPage = () => {
  const [form, setForm] = useState({ userName: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState("")
  const [isAnimated, setIsAnimated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsAnimated(true)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const res = await login(form)
      const token = res.data.token
      saveToken(token)

      const userRes = await getUserInfo(form.userName, token)
      saveUser(userRes.data)

      navigate("/app/tasks")
    } catch (err) {
      setError("❌ Sai tài khoản hoặc mật khẩu.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value })
    if (error) setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white opacity-5 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white opacity-5 rounded-full animate-ping"></div>
      </div>

      <div
        className={`relative z-10 bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-6 w-full max-w-sm border border-white/30 transform transition-all duration-1000 ${
          isAnimated ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 animate-bounce">
            <HiSparkles className="text-white text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Chào mừng trở lại!</h2>
          <p className="text-white/80 text-sm">Đăng nhập để tiếp tục hành trình của bạn</p>
        </div>

        {error && (
          <div className="bg-red-500/20 backdrop-blur border border-red-300/50 text-red-100 px-4 py-3 rounded-xl mb-5 text-sm text-center animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="relative group">
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${focusedField === "userName" || form.userName ? "text-purple-300 scale-110" : "text-white/60"}`}>
              <FaUser />
            </div>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={form.userName}
              onChange={(e) => handleInputChange("userName", e.target.value)}
              onFocus={() => setFocusedField("userName")}
              onBlur={() => setFocusedField("")}
              className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-300 hover:bg-white/20"
              required
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${focusedField === "password" || form.password ? "text-purple-300 scale-110" : "text-white/60"}`}>
              <FaLock />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={form.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField("")}
              className="w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-300 hover:bg-white/20"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-purple-300 transition-colors"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Remember me & forgot password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-white/80 cursor-pointer hover:text-white transition">
              <input type="checkbox" className="mr-2 rounded" />
              Ghi nhớ đăng nhập
            </label>
            <a href="#" className="text-purple-200 hover:text-white transition hover:underline">
              Quên mật khẩu?
            </a>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" />
                Đang đăng nhập...
              </div>
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-white/30"></div>
          <span className="px-3 text-white/60 text-sm">hoặc</span>
          <div className="flex-1 h-px bg-white/30"></div>
        </div>

        {/* Social login */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          <button className="flex items-center justify-center py-2 bg-white/10 backdrop-blur border border-white/30 rounded-xl text-white hover:bg-white/20 transition hover:scale-105">
            <FaGoogle />
          </button>
          <button className="flex items-center justify-center py-2 bg-white/10 backdrop-blur border border-white/30 rounded-xl text-white hover:bg-white/20 transition hover:scale-105">
            <FaFacebook />
          </button>
          <button className="flex items-center justify-center py-2 bg-white/10 backdrop-blur border border-white/30 rounded-xl text-white hover:bg-white/20 transition hover:scale-105">
            <FaGithub />
          </button>
        </div>

        {/* Register link */}
        <p className="text-center text-white/80 text-sm">
          Chưa có tài khoản?{" "}
          <a
            href="/register"
            className="text-purple-200 font-medium hover:text-white transition-colors hover:underline"
          >
            Đăng ký ngay
          </a>
        </p>
      </div>

      {/* Shake animation */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default LoginPage
