import React, { useState } from 'react'
import '../styles/LanguagePage.css'

export default function TeluguPage({ onNext, onBack }) {
  const [textArea, setTextArea] = useState('')

  return (
    <div className="language-page telugu-page">
      <button className="back-button" onClick={onBack}>← Back</button>

      <div className="page-header">
        <h1>Telugu Wishes for Madhu 🇮🇳</h1>
        <p className="subtitle">Telugu - తెలుగు</p>
      </div>

      <div className="content-box">
        <div className="language-section">
          <h2>Telugu - తెలుగు</h2>
          <p className="section-description">Share your Telugu wishes and messages here</p>
        </div>

        <div className="text-input-area">
          <textarea
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
            placeholder="Type your Telugu wishes or quotes here..."
            className="text-input"
          />
          <p className="char-count">{textArea.length} characters</p>
        </div>

        <button className="next-button" onClick={onNext}>
          Next Page →
        </button>
      </div>

      <div className="decorative-elements">
        <span className="emoji">🌸</span>
        <span className="emoji">✨</span>
        <span className="emoji">🎈</span>
      </div>
    </div>
  )
}
