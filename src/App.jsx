import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>

  )
}

export default App
