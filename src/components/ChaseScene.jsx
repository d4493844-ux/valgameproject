import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const animalEmojis = {
  butterfly: '🦋',
  bunny: '🐰',
  cat: '🐱',
  swan: '🦢'
}

export default function ChaseScene({ animal, onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete(), 500)
          return 100
        }
        return prev + 1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [onComplete])

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
        background: 'linear-gradient(135deg, #FFE5B4 0%, #FFDAB9 50%, #FFB6C1 100%)',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '50%',
        background: 'linear-gradient(180deg, #FFD700 0%, #FF69B4 100%)',
        opacity: 0.3,
        pointerEvents: 'none'
      }} />

      <motion.div
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          position: 'absolute',
          top: '15%',
          right: '15%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #FFD700 0%, #FFA500 100%)',
          boxShadow: '0 0 100px rgba(255, 215, 0, 0.6)',
          zIndex: 0
        }}
      />

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '30%',
        background: 'linear-gradient(180deg, rgba(34, 139, 34, 0.3) 0%, rgba(0, 100, 0, 0.4) 100%)',
        borderTop: '3px solid rgba(34, 139, 34, 0.3)'
      }} />

      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: window.innerHeight
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: -100
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            fontSize: '30px',
            opacity: 0.2,
            pointerEvents: 'none'
          }}
        >
          💕
        </motion.div>
      ))}

      <div style={{
        width: '100%',
        maxWidth: '800px',
        height: '300px',
        position: 'relative',
        zIndex: 1
      }}>
        <motion.div
          animate={{
            x: [0, window.innerWidth * 0.6],
            y: [0, -30, 0, -20, 0]
          }}
          transition={{
            duration: 5,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            left: '20%',
            top: '50%',
            fontSize: '80px',
            zIndex: 2
          }}
        >
          {animalEmojis[animal]}
        </motion.div>

        <motion.div
          animate={{
            x: [0, window.innerWidth * 0.6],
            y: [0, -25, 0, -15, 0]
          }}
          transition={{
            duration: 5,
            ease: 'easeInOut',
            delay: 0.3
          }}
          style={{
            position: 'absolute',
            left: '10%',
            top: '50%',
            fontSize: '70px',
            zIndex: 1
          }}
        >
          🏃
        </motion.div>

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0],
              x: [0, window.innerWidth * 0.6],
              y: 0
            }}
            transition={{
              duration: 5,
              delay: i * 0.3,
              ease: 'easeOut'
            }}
            style={{
              position: 'absolute',
              left: '15%',
              top: '50%',
              fontSize: '30px',
              color: '#ff69b4'
            }}
          >
            💖
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        style={{
          position: 'absolute',
          bottom: '25%',
          textAlign: 'center',
          zIndex: 2
        }}
      >
        <h2 style={{
          fontSize: '36px',
          color: '#fff',
          textShadow: '2px 2px 20px rgba(0,0,0,0.3)',
          fontWeight: 'bold',
          marginBottom: '10px'
        }}>
          A Romantic Chase
        </h2>
        <motion.p
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            fontSize: '20px',
            color: '#ffe',
            textShadow: '1px 1px 10px rgba(0,0,0,0.2)',
            fontStyle: 'italic'
          }}
        >
          Following your heart through the sunset...
        </motion.p>
      </motion.div>

      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        maxWidth: '400px',
        zIndex: 2
      }}>
        <div style={{
          width: '100%',
          height: '8px',
          background: 'rgba(255,255,255,0.3)',
          borderRadius: '4px',
          overflow: 'hidden',
          backdropFilter: 'blur(10px)'
        }}>
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #ff69b4, #ff1493)',
              width: `${progress}%`,
              borderRadius: '4px',
              boxShadow: '0 0 20px rgba(255,20,147,0.5)'
            }}
          />
        </div>
      </div>

      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`bird-${i}`}
          initial={{ x: -100, y: 100 + i * 50 }}
          animate={{ x: window.innerWidth + 100 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: i * 2,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            fontSize: '24px',
            opacity: 0.4,
            zIndex: 0
          }}
        >
          🦅
        </motion.div>
      ))}
    </motion.div>
  )
}