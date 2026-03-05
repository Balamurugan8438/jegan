import React, { useState, useEffect, useRef } from 'react'
import '../styles/TalkingTomPage.css'

export default function TalkingTomPage({ onBack, onHome }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showDanceQuestion, setShowDanceQuestion] = useState(false)
  const [noButtonHidden, setNoButtonHidden] = useState(false)
  const [showFinalPopup, setShowFinalPopup] = useState(false)

  const videoRef = useRef(null)

  const videoSequence = [
    { name: "../../vid.mp4", label: "Tom's Message 1" },
    { name: "tom_new2.mp4", label: "Tom's Message 2" },
    { name: "tom_new3.mp4", label: "Tom's Message 3" }
  ]

  const playNextVideo = (index) => {
    if (index >= videoSequence.length) {
      setIsPlaying(false)
      setShowFinalPopup(true) // show final popup
      return
    }

    setCurrentVideoIndex(index)
    setIsPlaying(true)

    if (videoRef.current) {
      videoRef.current.src = `/videos/${videoSequence[index].name}`
      videoRef.current.play()
    }
  }

  const handleVideoEnded = () => {
    if (currentVideoIndex === 0) {
      setShowDanceQuestion(true)
      setNoButtonHidden(false)
      return
    }

    playNextVideo(currentVideoIndex + 1)
  }

  const handleDanceYes = () => {
    setShowDanceQuestion(false)
    setNoButtonHidden(false)
    playNextVideo(1)
  }

  const handleDanceNo = () => {
    setNoButtonHidden(true)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      playNextVideo(0)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  const handleReplay = () => {
    setShowFinalPopup(false)
    playNextVideo(0)
  }

  return (
    <div className="talking-tom-page">
      <div className="top-buttons">
        <button className="home-button" onClick={onHome}>🏠 Home</button>
        <button className="replay-button" onClick={handleReplay}>🔄 Replay</button>
      </div>

      <div className="tom-container">
        <div className="video-wrapper">
          <video
            ref={videoRef}
            className="tom-video"
            onEnded={handleVideoEnded}
            onClick={handleVideoClick}
            playsInline
            controls
            autoPlay
          >
            <source src="/videos/vid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay"></div>
        </div>
      </div>

      {showDanceQuestion && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p className="modal-question">Can I dance now?</p>
            <div className="modal-buttons">
              <button className="modal-btn yes-btn" onClick={handleDanceYes}>
                Yes
              </button>

              {!noButtonHidden && (
                <button
                  className="modal-btn no-btn"
                  onClick={handleDanceNo}
                >
                  No
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showFinalPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p className="modal-question">
              Hi Madam,<br /><br />
              I wish u great success and hope u achieve many goals in ur upcoming life.
              In every situation, whether good or challenging, I will always be there
              to support u.<br /><br />
              Thank you for taking the time to visit and view this pages.
            </p>

            <div className="modal-buttons">
              <button
                className="modal-btn yes-btn"
                onClick={() => setShowFinalPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="decorative-elements">
        <span className="emoji">🎬</span>
        <span className="emoji">🎉</span>
        <span className="emoji">🎊</span>
      </div>
    </div>
  )
}