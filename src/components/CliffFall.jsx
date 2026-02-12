import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const animalEmojis = {
  butterfly: '🦋',
  bunny: '🐰',
  cat: '🐱',
  swan: '🦢'
}

export default function CliffFall({ animal, onComplete }) {
  const [phase, setPhase] = useState('approach')
  const [holdProgress, setHoldProgress] = useState(0)
  const [isHolding, setIsHolding] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('falling'), 3000)
    const timer2 = setTimeout(() => setPhase('holding'), 5000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  useEffect(() => {
    if (phase === 'holding' && isHolding) {
      const interval = setInterval(() => {
        setHoldProgress(prev => {
          const next = prev + 2
          if (next >= 100) {
            clearInterval(interval)
            setPhase('saved')
            setTimeout(() => onComplete(), 2000)
            return 100
          }
          return next
        })
      }, 50)

      return () => clearInterval(interval)
    }
  }, [phase, isHolding, onComplete])

  const handlePointerDown = () => {
    if (phase === 'holding') {
      setIsHolding(true)
    }
  }

  const handlePointerUp = () => {
    setIsHolding(false)
    if (holdProgress < 100) {
      setHoldProgress(0)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: phase === 'falling' || phase === 'holding'
          ? 'linear-gradient(180deg, #87CEEB 0%, #4682B4 100%)'
          : 'linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #87CEEB 100%)',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 1s'
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchEnd={handlePointerUp}
    >
      {/* MASSIVE CLIFF EDGE */}
      {phase === 'approach' && (
        <>
          {/* The cliff mountain */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '40%',
              height: '70%',
              background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
              clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 100%)',
              zIndex: 1,
              boxShadow: 'inset -20px -20px 50px rgba(0,0,0,0.3)'
            }}
          />

          {/* Cliff edge highlight */}
          <div style={{
            position: 'absolute',
            right: '40%',
            top: '30%',
            width: '5px',
            height: '70%',
            background: '#D2691E',
            zIndex: 2
          }} />

          {/* Rocks on cliff */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                right: `${5 + i * 7}%`,
                bottom: `${10 + i * 12}%`,
                width: '30px',
                height: '30px',
                background: '#696969',
                borderRadius: '50%',
                zIndex: 1
              }}
            />
          ))}
        </>
      )}

      {/* APPROACH PHASE - RUNNING TOWARDS CLIFF (LEFT TO RIGHT, FACING RIGHT) */}
      {phase === 'approach' && (
        <>
          {/* Animal running to cliff edge - FLIPPED TO FACE RIGHT */}
          <motion.div
            animate={{ left: ['5%', '55%'] }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '35%',
              fontSize: '80px',
              zIndex: 3,
              transform: 'scaleX(-1)' // FLIP TO FACE RIGHT
            }}
          >
            {animalEmojis[animal]}
          </motion.div>

          {/* Person chasing - FLIPPED TO FACE RIGHT */}
          <motion.div
            animate={{ left: ['0%', '48%'] }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '35%',
              fontSize: '70px',
              zIndex: 3,
              transform: 'scaleX(-1)' // FLIP TO FACE RIGHT
            }}
          >
            🏃
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{
              position: 'absolute',
              top: '15%',
              fontSize: '32px',
              color: '#fff',
              fontWeight: 'bold',
              textShadow: '2px 2px 10px rgba(0,0,0,0.5)',
              zIndex: 4
            }}
          >
            They reached the cliff edge...
          </motion.p>
        </>
      )}

      {/* FALLING PHASE - DRAMATIC FALL */}
      {(phase === 'falling' || phase === 'holding' || phase === 'saved') && (
        <>
          {/* Person falling - TUMBLING */}
          <motion.div
            initial={{ y: 0, rotate: 0 }}
            animate={
              phase === 'saved'
                ? { y: window.innerHeight * 0.4, rotate: 0, scale: 1 }
                : { 
                    y: [0, window.innerHeight * 0.5], 
                    rotate: [0, 180, 360, 540],
                    scale: [1, 0.8, 1]
                  }
            }
            transition={
              phase === 'saved'
                ? { duration: 0.8, ease: 'easeOut' }
                : { duration: 2.5, ease: 'easeIn' }
            }
            style={{
              position: 'absolute',
              top: '10%',
              left: '45%',
              fontSize: '70px',
              zIndex: 3,
              filter: phase === 'falling' || phase === 'holding' ? 'blur(1px)' : 'none'
            }}
          >
            🧑
          </motion.div>

          {/* Animal falling with person */}
          <motion.div
            initial={{ y: 0, rotate: 0 }}
            animate={
              phase === 'saved'
                ? { y: window.innerHeight * 0.4, rotate: 0 }
                : { 
                    y: [0, window.innerHeight * 0.5], 
                    rotate: [0, -180, -360]
                  }
            }
            transition={
              phase === 'saved'
                ? { duration: 0.8, ease: 'easeOut' }
                : { duration: 2.5, ease: 'easeIn' }
            }
            style={{
              position: 'absolute',
              top: '8%',
              left: '52%',
              fontSize: '60px',
              zIndex: 3
            }}
          >
            {animalEmojis[animal]}
          </motion.div>

          {/* WIND EFFECT */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, opacity: 0 }}
              animate={{
                y: window.innerHeight + 100,
                opacity: [0, 0.5, 0],
                x: [0, Math.random() * 50 - 25]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.08,
                ease: 'linear'
              }}
              style={{
                position: 'absolute',
                left: `${30 + i * 2.5}%`,
                width: '3px',
                height: '60px',
                background: 'rgba(255,255,255,0.6)',
                borderRadius: '2px'
              }}
            />
          ))}
        </>
      )}

      {/* "CATCH ME" TEXT */}
      {phase === 'falling' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            position: 'absolute',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 4
          }}
        >
          <motion.h1
            animate={{
              scale: [1, 1.15, 1],
              textShadow: [
                '0 0 30px rgba(255,20,147,0.6)',
                '0 0 60px rgba(255,20,147,1)',
                '0 0 30px rgba(255,20,147,0.6)'
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              fontSize: '64px',
              color: 'white',
              fontWeight: 'bold',
              textShadow: '0 0 40px rgba(255,20,147,0.8)',
              marginBottom: '15px',
              lineHeight: 1.2
            }}
          >
            CATCH ME...
          </motion.h1>
          <motion.h2
            animate={{ 
              opacity: [0.8, 1, 0.8],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{
              fontSize: '48px',
              color: '#FFD700',
              fontWeight: 'bold',
              textShadow: '0 0 30px rgba(255,215,0,1)',
              fontStyle: 'italic'
            }}
          >
            I'M FALLING FOR YOU 💕
          </motion.h2>
        </motion.div>
      )}

      {/* HOLD INSTRUCTION */}
      {phase === 'holding' && holdProgress < 100 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            zIndex: 5
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{
              fontSize: '100px',
              marginBottom: '20px'
            }}
          >
            👇
          </motion.div>

          <h2 style={{
            fontSize: '52px',
            color: 'white',
            fontWeight: 'bold',
            marginBottom: '15px',
            textShadow: '0 0 30px rgba(0,0,0,0.8)',
            background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 20px rgba(255,20,147,0.8))'
          }}>
            HOLD THE SCREEN!
          </h2>

          <p style={{
            fontSize: '28px',
            color: '#FFD700',
            fontStyle: 'italic',
            textShadow: '0 0 20px rgba(0,0,0,0.8)',
            fontWeight: 'bold',
            marginBottom: '30px'
          }}>
            Save them from falling!
          </p>

          <div style={{
            position: 'relative',
            width: '180px',
            height: '180px',
            margin: '0 auto'
          }}>
            <svg width="180" height="180" style={{ transform: 'rotate(-90deg)' }}>
              <circle
                cx="90"
                cy="90"
                r="75"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="15"
                fill="none"
              />
              <motion.circle
                cx="90"
                cy="90"
                r="75"
                stroke="#FFD700"
                strokeWidth="15"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 75}`}
                strokeDashoffset={`${2 * Math.PI * 75 * (1 - holdProgress / 100)}`}
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(255,215,0,1))'
                }}
              />
            </svg>

            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '42px',
              color: 'white',
              fontWeight: 'bold',
              textShadow: '0 0 10px rgba(0,0,0,0.8)'
            }}>
              {Math.round(holdProgress)}%
            </div>
          </div>
        </motion.div>
      )}

      {/* SAVED PHASE */}
      {phase === 'saved' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 5
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.4, 1], rotate: [0, 360] }}
            transition={{ duration: 1.5 }}
            style={{ fontSize: '120px', marginBottom: '20px' }}
          >
            💖
          </motion.div>

          <h1 style={{
            fontSize: '56px',
            color: 'white',
            fontWeight: 'bold',
            textShadow: '0 0 40px rgba(255,215,0,1)',
            marginBottom: '10px'
          }}>
            SAFE LANDING!
          </h1>

          <p style={{
            fontSize: '32px',
            color: '#FFD700',
            fontStyle: 'italic',
            marginTop: '10px',
            textShadow: '0 0 20px rgba(0,0,0,0.8)',
            fontWeight: 'bold'
          }}>
            You caught them with your heart! 💕
          </p>
        </motion.div>
      )}

      {/* CONFETTI */}
      {phase === 'saved' && (
        <>
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                opacity: 1
              }}
              animate={{
                x: window.innerWidth / 2 + (Math.random() - 0.5) * 1000,
                y: [window.innerHeight / 2, window.innerHeight + 100],
                opacity: 0,
                rotate: Math.random() * 1080
              }}
              transition={{
                duration: 2.5,
                ease: 'easeOut'
              }}
              style={{
                position: 'absolute',
                fontSize: '40px',
                pointerEvents: 'none'
              }}
            >
              {['💕', '💖', '💗', '💝', '✨', '🌟', '⭐'][Math.floor(Math.random() * 7)]}
            </motion.div>
          ))}
        </>
      )}
    </motion.div>
  )
}