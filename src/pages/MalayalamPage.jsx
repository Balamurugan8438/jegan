import React from 'react'
import '../styles/LanguagePage.css'
import madhuVideo from '../../sketch_vid.mp4'   // import video

export default function MalayalamPage({ onNext, onBack }) {
  return (
    <div className="language-page malayalam-page">
      <button className="back-button" onClick={onBack}>← Back</button>

      <div className="content-box">
        {/* Malayalam Greeting */}
        <h1 className="birthday-greeting">ജന്മദിനാശംസകൾ മധു! 🎂</h1>

        {/* Video instead of Image */}
        <div className="sketch-portrait-container">
          <video
            src={madhuVideo}
            className="madhu-sketch-portrait"
            controls
            autoPlay
            loop
            muted
          />
        </div>

        <hr className="divider-line" />

        <button className="next-button" onClick={onNext}>
          Next Page →
        </button>
      </div>

      <div className="decorative-elements">
        <span className="emoji">🌺</span>
        <span className="emoji">💚</span>
        <span className="emoji">🎊</span>
      </div>
    </div>
  )
}