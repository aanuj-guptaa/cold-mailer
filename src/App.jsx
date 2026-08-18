import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import LandingPage from './pages/LandingPage'
import GeneratorPage from './pages/GeneratorPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/generator" element={<GeneratorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
