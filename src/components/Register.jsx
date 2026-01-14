import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // ตรวจสอบว่ามีข้อมูลครบไหมก่อนส่ง
      if (!username || !password) {
        setMessage("Please fill in all fields")
        return
      }
      const response = await axios.post('http://localhost:3001/register', { username, password })
      navigate('/login')
    } catch (error) {
      console.error('Registration failed:', error)
      // แสดงข้อความ error จาก Backend ถ้ามี
      setMessage(error.response?.data?.message || "Registration failed")
    }
  }

  return (
    <div className="container-fluid p-0 bg-black min-vh-100 d-flex align-items-center" data-bs-theme="dark">
      <div className="row g-0 w-100 min-vh-100">
        
        {/* ฝั่งซ้าย: รูปภาพ (ซ่อนในมือถือ) */}
        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-black overflow-hidden">
          <img 
            src="https://i.pinimg.com/736x/b6/21/16/b62116e3a13811d253e7fc9017c75170.jpg" 
            alt="Illustration" 
            style={{ 
              maxWidth: "70%", 
              maxHeight: "70%", 
              objectFit: "contain",
              filter: "drop-shadow(0 0 20px rgba(255,255,255,0.1))"
            }}
          />
        </div>

        {/* ฝั่งขวา: ฟอร์ม Register */}
        <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center p-4">
          <div className="card p-4 p-md-5 shadow-lg border-0" 
               style={{ 
                 maxWidth: "400px", 
                 width: "100%", 
                 backgroundColor: "#161b22", 
                 borderRadius: "1.5rem" 
               }}>
            
            <div className="text-center mb-4">
              <h2 className="fw-bold text-white">Create Account</h2>
              <p className="text-muted small">Join us to get started</p>
            </div>

            {/* แสดงข้อความแจ้งเตือนถ้ามี Error */}
            {message && <div className="alert alert-danger py-2 small text-center">{message}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-muted small">Username</label>
                <input
                  type="text"
                  className="form-control form-control-lg bg-dark border-secondary text-white"
                  style={{ fontSize: "1rem" }}
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-muted small">Password</label>
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
                Register
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-muted small">
                Already have an account? <Link to="/login" className="text-primary text-decoration-none fw-bold">Sign In</Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Register