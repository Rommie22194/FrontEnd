import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'

function App() {
  return (
    <Router>
      <Routes>
        {/* หน้าแรกให้ redirect */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* กัน route อื่น ๆ */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
