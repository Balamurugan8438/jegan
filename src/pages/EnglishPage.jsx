import React, { useState } from 'react'
import '../styles/LanguagePage.css'

export default function EnglishPage({ onNext, onBack }) {
  const [textArea, setTextArea] = useState('')

  return (
    <div className="language-page english-page">
      <button className="back-button" onClick={onBack}>← Back</button>

      <div className="page-header">
        <h1>English Wishes for Madhu 💝</h1>
        <p className="subtitle">English - Happy Birthday</p>
      </div>

      <div className="content-box">
        <div className="language-section">
          <h2>English Birthday Wishes & Poetry</h2>
          <p className="language-text">
            💫 On your special day, may all your dreams come true 💫
          </p>
          <p className="language-text">
            You are the most wonderful person I know. Your kindness, strength, and beautiful smile light up everyone's lives.
          </p>
          <p className="language-text">
            Today we celebrate you - the amazing person you are and the incredible person you continue to become.
          </p>
        </div>

        <div className="text-input-area">
          <h3>Add Your English Birthday Wishes:</h3>
          <textarea
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
            placeholder="Type your birthday wishes or quotes here..."
            className="text-input"
          />
          <p className="char-count">{textArea.length} characters</p>
        </div>

        <button className="next-button" onClick={onNext}>
          Next Page →
        </button>
      </div>

      <div className="decorative-elements">
        <span className="emoji">💖</span>
        <span className="emoji">🌹</span>
        <span className="emoji">🎂</span>
      </div>
    </div>
  )
}
