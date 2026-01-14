import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password })
      
      // ถ้า Login สำเร็จ มักจะเก็บ Token ไว้ใน localStorage
      localStorage.setItem('token', response.data.token) 
      
      // ไปยังหน้า Dashboard หรือหน้าหลัก
      navigate('/dashboard') 
    } catch (error) {
      console.error('Login failed:', error)
      // แสดงข้อความ Error เช่น "Username หรือ Password ไม่ถูกต้อง"
      setMessage(error.response?.data?.message || "Invalid username or password")
    }
  }

  return (
    <div className="container-fluid p-0 bg-black min-vh-100 d-flex align-items-center" data-bs-theme="dark">
      <div className="row g-0 w-100 min-vh-100">
        
        {/* ฝั่งซ้าย: รูปภาพ (ซ่อนในมือถือ) */}
        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-black overflow-hidden">
          <img 
            src="https://i.pinimg.com/736x/b6/21/16/b62116e3a13811d253e7fc9017c75170.jpg" 
            alt="Login Illustration" 
            style={{ 
              maxWidth: "70%", 
              maxHeight: "70%", 
              objectFit: "contain",
              filter: "drop-shadow(0 0 20px rgba(255,255,255,0.1))"
            }}
          />
        </div>

        {/* ฝั่งขวา: ฟอร์ม Login */}
        <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center p-4">
          <div className="card p-4 p-md-5 shadow-lg border-0" 
               style={{ 
                 maxWidth: "400px", 
                 width: "100%", 
                 backgroundColor: "#161b22", 
                 borderRadius: "1.5rem" 
               }}>
            
            <div className="text-center mb-4">
              <h2 className="fw-bold text-white">Welcome Back</h2>
              <p className="text-muted small">Enter your credentials to access your account</p>
            </div>

            {/* แสดง Error Message ถ้ามี */}
            {message && (
              <div className="alert alert-danger py-2 small text-center border-0" style={{ backgroundColor: "rgba(220, 53, 69, 0.2)", color: "#ff6b6b" }}>
                {message}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label text-muted small">Username</label>
                <input
                  type="text"
                  className="form-control form-control-lg bg-dark border-secondary text-white"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-muted small d-flex justify-content-between">
                  Password
                  <a href="#" className="text-primary text-decoration-none" style={{ fontSize: '0.75rem' }}>Forgot?</a>
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg bg-dark border-secondary text-white"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button className="btn btn-primary w-100 py-2 fw-bold mb-3" style={{ borderRadius: "0.8rem" }}>
                Sign In
              </button>

              <button type="button" className="btn btn-outline-secondary w-100 py-2 d-flex align-items-center justify-content-center" style={{ borderRadius: "0.8rem" }}>
                <img src="https://www.google.com/favicon.ico" alt="google" className="me-2" style={{width: "16px"}} />
                Continue with Google
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-muted small">
                New here? <Link to="/register" className="text-primary text-decoration-none fw-bold">Create an account</Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login
