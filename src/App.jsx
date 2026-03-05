import { useState } from 'react'
import HomePage from './pages/HomePage'
import TamilPage from './pages/TamilPage'
import MalayalamPage from './pages/MalayalamPage'
import TalkingTomPage from './pages/TalkingTomPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState(0)

  const pages = [
    <HomePage key="home" onNext={() => setCurrentPage(1)} />,
    <TamilPage key="tamil" onNext={() => setCurrentPage(2)} onBack={() => setCurrentPage(0)} />,
    <MalayalamPage key="malayalam" onNext={() => setCurrentPage(3)} onBack={() => setCurrentPage(1)} />,
    <TalkingTomPage key="tom" onBack={() => setCurrentPage(2)} onHome={() => setCurrentPage(0)} />
  ]

  return (
    <div className="app-container">
      {pages[currentPage]}
    </div>
  )
}

export default App
