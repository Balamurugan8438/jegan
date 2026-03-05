import { useState, useEffect } from "react";
import { useRef } from "react";
import "../styles/HomePage.css";

export default function HomePage({ onNext }) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  const lines = [
    "Hey Madhu!",
    "Today is March 6...",
    "And it's your special day...",
    "A day meant to celebrate you...",
    "Happy Birthday, Madhu",
  ];

  useEffect(() => {
    if (currentLineIndex < lines.length) {
      const lineText = lines[currentLineIndex];
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex <= lineText.length) {
          setDisplayedLines((prev) => {
            const newLines = [...prev];
            newLines[currentLineIndex] = lineText.substring(0, charIndex);
            return newLines;
          });
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setCurrentLineIndex(currentLineIndex + 1);
          }, 600);
        }
      }, 70);
      return () => clearInterval(typeInterval);
    }
  }, [currentLineIndex]);

  // Cracker animation on black background only
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let particles = [];

    function randomColor() {
      const colors = ["#ff0", "#f00", "#0ff", "#fff", "#f0f", "#0f0", "#00f", "#ff8000", "#00ff80", "#ff00ff"];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function getCardRect() {
      let cardWidth = Math.min(550, W - 60);
      let cardHeight = 600;
      let cardLeft = (W - cardWidth) / 2;
      let cardRight = cardLeft + cardWidth;
      let cardTop = (H - cardHeight) / 2;
      let cardBottom = cardTop + cardHeight;
      return { cardLeft, cardRight, cardTop, cardBottom };
    }

    function isInBlackArea(x, y) {
      const { cardLeft, cardRight, cardTop, cardBottom } = getCardRect();
      if (W > 600) {
        // Black areas: left and right sides
        return x < cardLeft || x > cardRight;
      } else {
        // Black areas: top and bottom
        return y < cardTop || y > cardBottom;
      }
    }

    function createCrackerInBlack() {
      const { cardLeft, cardRight, cardTop, cardBottom } = getCardRect();
      let x, y;
      
      if (W > 600) {
        // Randomly choose left or right side
        if (Math.random() > 0.5) {
          x = Math.random() * (cardLeft - 20) + 10;
        } else {
          x = Math.random() * (W - cardRight - 20) + cardRight + 10;
        }
        y = Math.random() * H;
      } else {
        // Randomly choose top or bottom
        x = Math.random() * W;
        if (Math.random() > 0.5) {
          y = Math.random() * (cardTop - 20) + 10;
        } else {
          y = Math.random() * (H - cardBottom - 20) + cardBottom + 10;
        }
      }
      
      createCracker(x, y);
    }

    function createCracker(x, y) {
      // Create burst of star-shaped particles
      const burstCount = 50;
      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5);
        const speed = Math.random() * 6 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: randomColor(),
          size: Math.random() * 4 + 2,
          rotation: Math.random() * Math.PI * 2,
          isStar: Math.random() > 0.3
        });
      }
    }

    function drawStar(ctx, x, y, size, rotation) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 4) / 5 - Math.PI / 2;
        const radius = i % 2 === 0 ? size : size / 2;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);
      
      particles.forEach((p) => {
        // Only draw if in black area
        if (!isInBlackArea(p.x, p.y)) {
          p.alpha = 0;
          return;
        }

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 15;

        if (p.isStar) {
          drawStar(ctx, p.x, p.y, p.size, p.rotation);
          p.rotation += 0.1;
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.alpha -= 0.015;
      });

      particles = particles.filter((p) => p.alpha > 0);
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      requestAnimationFrame(animate);
    }

    let interval = setInterval(() => {
      createCrackerInBlack();
    }, 500);
    
    animate();

    window.addEventListener("resize", () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    });

    return () => {
      clearInterval(interval);
    };
  }, []);

  const isComplete = currentLineIndex >= lines.length;

  return (
    <div className="home-page-image" style={{ backgroundColor: "black" }}>
      {/* Fireworks Canvas */}
      <canvas ref={canvasRef} className="fireworks-canvas"></canvas>
      {/* Audio Autoplay */}
      <audio ref={audioRef} src="/bdm.mp3" autoPlay style={{display:'none'}} />
      <div
        className="bg-image"
        style={{
          backgroundImage: "url(/hap_imag.jpg)",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      ></div>
      {/* <div className="overlay"></div> */}

      <div className="content-wrapper visible">
        <div className="content-box">
          <div className="greeting-section">
            <h1 className="main-greeting">
              {displayedLines[0]}
              <span
                className={`cursor ${
                  displayedLines[0] === lines[0] && currentLineIndex === 0
                    ? "active"
                    : ""
                }`}
              >
                |
              </span>
            </h1>
            <p className="date-text">
              {displayedLines[1]}
              <span
                className={`cursor ${
                  displayedLines[1] === lines[1] && currentLineIndex === 1
                    ? "active"
                    : ""
                }`}
              >
                |
              </span>
            </p>
          </div>

          <div className="divider"></div>

          <div className="message-section">
            <p className="message-line">
              {displayedLines[2]}
              <span
                className={`cursor ${
                  displayedLines[2] === lines[2] && currentLineIndex === 2
                    ? "active"
                    : ""
                }`}
              >
                |
              </span>
            </p>
            <p className="message-line">
              {displayedLines[3]}
              <span
                className={`cursor ${
                  displayedLines[3] === lines[3] && currentLineIndex === 3
                    ? "active"
                    : ""
                }`}
              >
                |
              </span>
            </p>
          </div>

          <div className="birthday-wish">
            <p className="wish-text">
              {displayedLines[4]}
              <span
                className={`cursor ${
                  displayedLines[4] === lines[4] && currentLineIndex === 4
                    ? "active"
                    : ""
                }`}
              >
                |
              </span>
            </p>
            <span className={`emoji ${isComplete ? "visible" : ""}`}>🎉</span>
          </div>

          <div className="accent-line"></div>

          <p className={`footer-text ${isComplete ? "visible" : ""}`}>
            May this year bring you joy, success, and countless beautiful
            moments
          </p>

          {isComplete && (
            <button className="home-next-btn" onClick={onNext} title="Continue">
              Next Page →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
