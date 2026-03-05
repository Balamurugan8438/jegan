import React, { useState, useEffect } from "react";
import "../styles/TamilLang.css";

export default function TamilPage({ onNext, onBack }) {
  const kavidhai = `உன் பிறந்தநாளைத் தவிர
காலண்டரின் மீதமுள்ள 364 நாட்களும்
தங்களுக்குள் சண்டையிட்டுக் கொள்கின்றன...

உன்னைத் தாலாட்டும் வரம்
அந்த ஒரு தேதிக்கு மட்டும்
எப்படி கிடைத்தது என்று!

இனிய பிறந்தநாள் வாழ்த்துகள்!`;

  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayText(kavidhai.substring(0, index + 1));
      index++;

      if (index === kavidhai.length) {
        clearInterval(interval);
      }
    }, 85);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="language-page tamil-page"
      style={{
        backgroundImage: "url(/kavitahi.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat"
      }}
    >
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <div className="content-wrapper">
        <div className=".content-box11  tamil-content-box">
          {/* Typing Tamil Kavidhai */}
          <div className="tamil-message">
            <p className="typing-text">
              {displayText.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>

          <button className="next-button" onClick={onNext}>
            Next Page →
          </button>
        </div>
      </div>
    </div>
  );
}
