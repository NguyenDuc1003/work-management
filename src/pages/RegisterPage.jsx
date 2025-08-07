"use client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserService } from "../services/UserService"
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSpinner,
  FaCheck,
  FaTimes,
  FaGoogle,
  FaFacebook,
  FaGithub,
} from "react-icons/fa"
import { HiSparkles } from "react-icons/hi"

const RegisterPage = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [focusedField, setFocusedField] = useState("")
  const [isAnimated, setIsAnimated] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsAnimated(true)
  }, [])

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[a-z]/.test(password)) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    return strength
  }

  const validateField = (field, value) => {
    const newErrors = { ...errors }
    switch (field) {
      case "userName":
        if (value.length < 3) newErrors.userName = "Tên đăng nhập phải có ít nhất 3 ký tự"
        else delete newErrors.userName
        break
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) newErrors.email = "Email không hợp lệ"
        else delete newErrors.email
        break
      case "password":
        if (value.length < 6) newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
        else delete newErrors.password
        setPasswordStrength(calculatePasswordStrength(value))
        break
      case "confirmPassword":
        if (value !== form.password) newErrors.confirmPassword = "Mật khẩu xác nhận không khớp"
        else delete newErrors.confirmPassword
        break
    }
    setErrors(newErrors)
  }

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value })
    validateField(field, value)
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return "bg-red-500"
    if (passwordStrength < 50) return "bg-orange-500"
    if (passwordStrength < 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return "Yếu"
    if (passwordStrength < 50) return "Trung bình"
    if (passwordStrength < 75) return "Mạnh"
    return "Rất mạnh"
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (Object.keys(errors).length > 0 || !agreedToTerms) {
      if (!agreedToTerms) setErrors({ ...errors, terms: "Bạn phải đồng ý với điều khoản sử dụng" })
      return
    }
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const res = await UserService.register({
        userName: form.userName,
        email: form.email,
        password: form.password,
      })
      console.log("Đăng ký thành công", res)
      navigate("/login")
    } catch {
      setErrors({ general: "Đăng ký thất bại, vui lòng thử lại" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-56 h-56 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-72 h-72 bg-white opacity-5 rounded-full animate-bounce"></div>
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-white opacity-5 rounded-full animate-ping"></div>
      </div>

      <div
        className={`relative z-10 bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl p-6 w-full max-w-[380px] border border-white/30 transform transition-all duration-1000 ${
          isAnimated ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-3 animate-bounce">
            <HiSparkles className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Tạo tài khoản mới</h1>
          <p className="text-white/80 text-sm">Tham gia cộng đồng của chúng tôi ngay hôm nay</p>
        </div>

        {/* General error */}
        {errors.general && (
          <div className="bg-red-500/20 backdrop-blur border border-red-300/50 text-red-100 px-3 py-2 rounded-xl mb-5 text-sm text-center animate-shake">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Username */}
          <div className="relative group">
            <div
              className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                focusedField === "userName" || form.userName ? "text-blue-300 scale-110" : "text-white/60"
              }`}
            >
              <FaUser />
            </div>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={form.userName}
              onChange={(e) => handleInputChange("userName", e.target.value)}
              onFocus={() => setFocusedField("userName")}
              onBlur={() => setFocusedField("")}
              className={`w-full pl-10 pr-8 py-3 bg-white/10 backdrop-blur border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-white/20 ${
                errors.userName
                  ? "border-red-400 focus:ring-red-300"
                  : "border-white/30 focus:ring-blue-300 focus:border-transparent"
              }`}
              required
            />
            {form.userName && !errors.userName && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400">
                <FaCheck />
              </div>
            )}
            {errors.userName && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400">
                <FaTimes />
              </div>
            )}
            {errors.userName && <p className="text-red-300 text-xs mt-1 ml-1">{errors.userName}</p>}
          </div>

          {/* Email */}
          <div className="relative group">
            <div
              className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                focusedField === "email" || form.email ? "text-blue-300 scale-110" : "text-white/60"
              }`}
            >
              <FaEnvelope />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField("")}
              className={`w-full pl-10 pr-8 py-3 bg-white/10 backdrop-blur border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-white/20 ${
                errors.email
                  ? "border-red-400 focus:ring-red-300"
                  : "border-white/30 focus:ring-blue-300 focus:border-transparent"
              }`}
              required
            />
            {form.email && !errors.email && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400">
                <FaCheck />
              </div>
            )}
            {errors.email && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400">
                <FaTimes />
              </div>
            )}
            {errors.email && <p className="text-red-300 text-xs mt-1 ml-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="relative group">
            <div
              className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                focusedField === "password" || form.password ? "text-blue-300 scale-110" : "text-white/60"
              }`}
            >
              <FaLock />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={form.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField("")}
              className={`w-full pl-10 pr-10 py-3 bg-white/10 backdrop-blur border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-white/20 ${
                errors.password
                  ? "border-red-400 focus:ring-red-300"
                  : "border-white/30 focus:ring-blue-300 focus:border-transparent"
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-blue-300 transition-colors duration-300"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            {/* Password strength */}
            {form.password && (
              <div className="mt-1">
                <div className="flex items-center justify-between text-xs text-white/80 mb-1">
                  <span>Độ mạnh mật khẩu</span>
                  <span
                    className={`font-medium ${
                      passwordStrength >= 75 ? "text-green-300" : passwordStrength >= 50 ? "text-yellow-300" : "text-red-300"
                    }`}
                  >
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                    style={{ width: `${passwordStrength}%` }}
                  ></div>
                </div>
              </div>
            )}
            {errors.password && <p className="text-red-300 text-xs mt-1 ml-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="relative group">
            <div
              className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                focusedField === "confirmPassword" || form.confirmPassword ? "text-blue-300 scale-110" : "text-white/60"
              }`}
            >
              <FaLock />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Xác nhận mật khẩu"
              value={form.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              onFocus={() => setFocusedField("confirmPassword")}
              onBlur={() => setFocusedField("")}
              className={`w-full pl-10 pr-10 py-3 bg-white/10 backdrop-blur border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-white/20 ${
                errors.confirmPassword
                  ? "border-red-400 focus:ring-red-300"
                  : "border-white/30 focus:ring-blue-300 focus:border-transparent"
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-blue-300 transition-colors duration-300"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {form.confirmPassword && !errors.confirmPassword && form.confirmPassword === form.password && (
              <div className="absolute right-10 top-1/2 -translate-y-1/2 text-green-400">
                <FaCheck />
              </div>
            )}
            {errors.confirmPassword && <p className="text-red-300 text-xs mt-1 ml-1">{errors.confirmPassword}</p>}
          </div>

          {/* Terms */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => {
                setAgreedToTerms(e.target.checked)
                if (e.target.checked) {
                  const newErrors = { ...errors }
                  delete newErrors.terms
                  setErrors(newErrors)
                }
              }}
              className="mt-1 w-4 h-4 text-blue-600 bg-white/20 border-white/30 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="terms" className="text-sm text-white/80 leading-relaxed">
              Tôi đồng ý với{" "}
              <a href="#" className="text-blue-200 hover:text-white transition-colors hover:underline">
                Điều khoản sử dụng
              </a>{" "}
              và{" "}
              <a href="#" className="text-blue-200 hover:text-white transition-colors hover:underline">
                Chính sách bảo mật
              </a>
            </label>
          </div>
          {errors.terms && <p className="text-red-300 text-xs ml-1">{errors.terms}</p>}

          {/* Register button */}
          <button
            type="submit"
            disabled={loading || Object.keys(errors).length > 0 || !agreedToTerms}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" />
                Đang tạo tài khoản...
              </div>
            ) : (
              "Tạo tài khoản"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-white/30"></div>
          <span className="px-3 text-white/60 text-sm">hoặc</span>
          <div className="flex-1 h-px bg-white/30"></div>
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <button className="flex items-center justify-center py-2 bg-white/10 backdrop-blur border border-white/30 rounded-xl text-white hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <FaGoogle />
          </button>
          <button className="flex items-center justify-center py-2 bg-white/10 backdrop-blur border border-white/30 rounded-xl text-white hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <FaFacebook />
          </button>
          <button className="flex items-center justify-center py-2 bg-white/10 backdrop-blur border border-white/30 rounded-xl text-white hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <FaGithub />
          </button>
        </div>

        {/* Login link */}
        <p className="text-center text-white/80 text-sm">
          Đã có tài khoản?{" "}
          <a href="/login" className="text-blue-200 font-medium hover:text-white transition-colors hover:underline">
            Đăng nhập
          </a>
        </p>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default RegisterPage
