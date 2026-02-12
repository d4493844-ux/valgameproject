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
    const timer1 = setTimeout(() => setPhase('falling'), 2000)
    const timer2 = setTimeout(() => setPhase('holding'), 4000)

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
    >
      {phase === 'approach' && (
        <motion.div
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          style={{
            position: 'absolute',
            right: 0,
            top: '40%',
            width: '200px',
            height: '60%',
            background: '#8B4513',
            clipPath: 'polygon(0 0, 100% 30%, 100% 100%, 0 100%)',
            zIndex: 1
          }}
        />
      )}

      {phase === 'approach' && (
        <>
          <motion.div
            animate={{ x: [0, window.innerWidth * 0.5] }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: '10%',
              top: '45%',
              fontSize: '80px',
              zIndex: 2
            }}
          >
            {animalEmojis[animal]}
          </motion.div>

          <motion.div
            animate={{ x: [0, window.innerWidth * 0.5] }}
            transition={{ duration: 2, ease: 'easeInOut', delay: 0.2 }}
            style={{
              position: 'absolute',
              left: '5%',
              top: '45%',
              fontSize: '70px',
              zIndex: 2
            }}
          >
            🏃
          </motion.div>
        </>
      )}
      
      {(phase === 'falling' || phase === 'holding' || phase === 'saved') && (
        <>
          <motion.div
            initial={{ y: 0 }}
            animate={
              phase === 'saved'
                ? { y: 200, rotate: 0 }
                : { y: [0, window.innerHeight * 0.3], rotate: [0, 360, 720] }
            }
            transition={
              phase === 'saved'
                ? { duration: 0.8, ease: 'easeOut' }
                : { duration: 2, ease: 'easeIn' }
            }
            style={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '70px',
              zIndex: 3
            }}
          >
            🧑
          </motion.div>

          <motion.div
            initial={{ y: 0 }}
            animate={
              phase === 'saved'
                ? { y: 200, rotate: 0 }
                : { y: [0, window.innerHeight * 0.3], rotate: [0, -180, -360] }
            }
            transition={
              phase === 'saved'
                ? { duration: 0.8, ease: 'easeOut' }
                : { duration: 2, ease: 'easeIn' }
            }
            style={{
              position: 'absolute',
              top: '5%',
              left: '55%',
              fontSize: '60px',
              zIndex: 3
            }}
          >
            {animalEmojis[animal]}
          </motion.div>

          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, opacity: 0 }}
              animate={{
                y: window.innerHeight + 100,
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'linear'
              }}
              style={{
                position: 'absolute',
                left: `${20 + i * 8}%`,
                width: '3px',
                height: '50px',
                background: 'rgba(255,255,255,0.5)',
                borderRadius: '2px'
              }}
            />
          ))}
        </>
      )}

      {phase === 'falling' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 4
          }}
        >
          <motion.h1
            animate={{
              scale: [1, 1.1, 1],
              textShadow: [
                '0 0 20px rgba(255,20,147,0.5)',
                '0 0 40px rgba(255,20,147,0.8)',
                '0 0 20px rgba(255,20,147,0.5)'
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              fontSize: '52px',
              color: 'white',
              fontWeight: 'bold',
              textShadow: '0 0 30px rgba(255,20,147,0.6)',
              marginBottom: '10px'
            }}
          >
            Catch me...
          </motion.h1>
          <motion.h2
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{
              fontSize: '38px',
              color: '#FFD700',
              fontWeight: 'bold',
              textShadow: '0 0 20px rgba(255,215,0,0.8)',
              fontStyle: 'italic'
            }}
          >
            I'm falling for you 💕
          </motion.h2>
        </motion.div>
      )}

      {phase === 'holding' && holdProgress < 100 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            bottom: '25%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            zIndex: 5
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{
              fontSize: '80px',
              marginBottom: '20px'
            }}
          >
            👆
          </motion.div>

          <h2 style={{
            fontSize: '42px',
            color: 'white',
            fontWeight: 'bold',
            marginBottom: '15px',
            textShadow: '0 0 30px rgba(0,0,0,0.5)'
          }}>
            HOLD THE SCREEN!
          </h2>

          <p style={{
            fontSize: '22px',
            color: '#FFD700',
            fontStyle: 'italic',
            textShadow: '0 0 20px rgba(0,0,0,0.5)'
          }}>
            Save them from falling!
          </p>

          <div style={{
            marginTop: '30px',
            position: 'relative',
            width: '150px',
            height: '150px',
            margin: '30px auto'
          }}>
            <svg width="150" height="150" style={{ transform: 'rotate(-90deg)' }}>
              <circle
                cx="75"
                cy="75"
                r="65"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="12"
                fill="none"
              />
              <motion.circle
                cx="75"
                cy="75"
                r="65"
                stroke="#FFD700"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 65}`}
                strokeDashoffset={`${2 * Math.PI * 65 * (1 - holdProgress / 100)}`}
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.8))'
                }}
              />
            </svg>

            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '32px',
              color: 'white',
              fontWeight: 'bold'
            }}>
              {Math.round(holdProgress)}%
            </div>
          </div>
        </motion.div>
      )}

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
            animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }}
            transition={{ duration: 1.5 }}
            style={{ fontSize: '100px', marginBottom: '20px' }}
          >
            💖
          </motion.div>

          <h1 style={{
            fontSize: '48px',
            color: 'white',
            fontWeight: 'bold',
            textShadow: '0 0 30px rgba(255,215,0,0.8)'
          }}>
            Safe Landing!
          </h1>

          <p style={{
            fontSize: '24px',
            color: '#FFD700',
            fontStyle: 'italic',
            marginTop: '10px',
            textShadow: '0 0 20px rgba(0,0,0,0.5)'
          }}>
            You caught them with your heart...
          </p>
        </motion.div>
      )}

      {phase === 'saved' && (
        <>
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                opacity: 1
              }}
              animate={{
                x: window.innerWidth / 2 + (Math.random() - 0.5) * 800,
                y: [window.innerHeight / 2, window.innerHeight + 100],
                opacity: 0,
                rotate: Math.random() * 720
              }}
              transition={{
                duration: 2,
                ease: 'easeOut'
              }}
              style={{
                position: 'absolute',
                fontSize: '30px',
                pointerEvents: 'none'
              }}
            >
              {['💕', '💖', '💗', '💝', '✨', '🌟'][Math.floor(Math.random() * 6)]}
            </motion.div>
          ))}
        </>
      )}
    </motion.div>
  )
}