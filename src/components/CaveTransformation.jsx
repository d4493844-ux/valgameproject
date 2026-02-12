import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const animalEmojis = {
  butterfly: '🦋',
  bunny: '🐰',
  cat: '🐱',
  swan: '🦢'
}

export default function CaveTransformation({ animal, receiverImageUrl, onComplete }) {
  const [phase, setPhase] = useState('landing') // landing, running, cave, transform, reveal

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('running'), 2000)
    const timer2 = setTimeout(() => setPhase('cave'), 4000)
    const timer3 = setTimeout(() => setPhase('transform'), 5500)
    const timer4 = setTimeout(() => setPhase('reveal'), 7000)
    const timer5 = setTimeout(() => onComplete(), 9500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
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
        background: phase === 'cave' || phase === 'transform' || phase === 'reveal'
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          : 'linear-gradient(135deg, #87CEEB 0%, #90EE90 100%)',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 1.5s ease'
      }}
    >
      {/* Landing phase - both land safely */}
      {phase === 'landing' && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
            position: 'relative',
            zIndex: 2
          }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: 1 }}
            style={{ fontSize: '80px' }}
          >
            🧑
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            style={{ fontSize: '70px' }}
          >
            {animalEmojis[animal]}
          </motion.div>
        </motion.div>
      )}

      {phase === 'landing' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            position: 'absolute',
            bottom: '30%',
            fontSize: '28px',
            color: '#333',
            fontStyle: 'italic',
            textAlign: 'center'
          }}
        >
          The {animal} landed safely in their hands...
        </motion.p>
      )}

      {/* Running phase - animal runs to cave */}
      {phase === 'running' && (
        <>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: window.innerWidth * 0.4 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: '30%',
              top: '50%',
              fontSize: '70px',
              zIndex: 2
            }}
          >
            {animalEmojis[animal]}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: window.innerWidth }}
            animate={{ opacity: 1, x: window.innerWidth * 0.65 }}
            transition={{ duration: 1.2 }}
            style={{
              position: 'absolute',
              right: '10%',
              top: '45%',
              fontSize: '100px',
              zIndex: 1
            }}
          >
            🕳️
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute',
              bottom: '25%',
              fontSize: '24px',
              color: '#333',
              fontStyle: 'italic'
            }}
          >
            The {animal} spots a mysterious cave...
          </motion.p>
        </>
      )}

      {/* Cave entrance phase */}
      {(phase === 'cave' || phase === 'transform' || phase === 'reveal') && (
        <>
          {/* Cave background */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, #2d2d44 0%, #1a1a2e 100%)',
            zIndex: 0
          }} />

          {/* Stalactites */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 0.6 }}
              transition={{ delay: 0.1 * i }}
              style={{
                position: 'absolute',
                top: 0,
                left: `${10 + i * 12}%`,
                width: '20px',
                height: '80px',
                background: 'linear-gradient(180deg, #555 0%, #333 100%)',
                clipPath: 'polygon(50% 0%, 0% 30%, 0% 100%, 100% 100%, 100% 30%)',
                opacity: 0.4
              }}
            />
          ))}
        </>
      )}

      {/* Transformation phase - glowing effect */}
      {phase === 'transform' && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 1],
            opacity: [0, 1, 0.8]
          }}
          transition={{ duration: 1.5 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,105,180,0.4) 50%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            zIndex: 1
          }}
        />
      )}

      {phase === 'transform' && (
        <>
          {/* Sparkles during transformation */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                scale: 0,
                opacity: 0
              }}
              animate={{
                x: window.innerWidth / 2 + (Math.random() - 0.5) * 400,
                y: window.innerHeight / 2 + (Math.random() - 0.5) * 400,
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                delay: Math.random() * 0.5
              }}
              style={{
                position: 'absolute',
                fontSize: '30px',
                zIndex: 2
              }}
            >
              ✨
            </motion.div>
          ))}

          <motion.div
            animate={{
              scale: [1, 0.8, 1],
              rotate: [0, 180, 360],
              opacity: [1, 0.5, 0]
            }}
            transition={{ duration: 1.5 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '100px',
              zIndex: 2
            }}
          >
            {animalEmojis[animal]}
          </motion.div>
        </>
      )}

      {/* Reveal phase - show the receiver's image */}
      {phase === 'reveal' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            position: 'relative',
            zIndex: 3,
            textAlign: 'center'
          }}
        >
          {/* Glowing halo around image */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.9, 0.6]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '350px',
              height: '350px',
              background: 'radial-gradient(circle, rgba(255,215,0,0.5) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(30px)',
              zIndex: 1
            }}
          />

          <motion.div
            initial={{ filter: 'blur(20px)' }}
            animate={{ filter: 'blur(0px)' }}
            transition={{ duration: 1.5 }}
            style={{
              position: 'relative',
              zIndex: 2
            }}
          >
            <img
              src={receiverImageUrl}
              alt="Beautiful transformation"
              style={{
                width: '280px',
                height: '280px',
                objectFit: 'cover',
                borderRadius: '50%',
                border: '6px solid rgba(255,215,0,0.8)',
                boxShadow: '0 0 60px rgba(255,215,0,0.6), 0 0 100px rgba(255,105,180,0.4)',
                marginBottom: '30px'
              }}
            />
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: '42px',
              color: '#FFD700',
              fontWeight: 'bold',
              textShadow: '0 0 30px rgba(255,215,0,0.8)',
              marginBottom: '15px',
              position: 'relative',
              zIndex: 2
            }}
          >
            The Transformation
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{
              fontSize: '24px',
              color: '#FFB6C1',
              fontStyle: 'italic',
              textShadow: '0 0 20px rgba(255,182,193,0.6)',
              position: 'relative',
              zIndex: 2
            }}
          >
            The {animal} was you all along... ✨
          </motion.p>

          {/* Floating hearts */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: 0,
                y: 0,
                opacity: 0
              }}
              animate={{
                x: (Math.random() - 0.5) * 300,
                y: -200,
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                delay: 1 + Math.random() * 0.5,
                repeat: Infinity,
                repeatDelay: Math.random() * 2
              }}
              style={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                fontSize: '24px',
                pointerEvents: 'none'
              }}
            >
              💖
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Ambient cave glow */}
      {(phase === 'cave' || phase === 'transform' || phase === 'reveal') && (
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '30%',
            background: 'radial-gradient(ellipse at bottom, rgba(138,43,226,0.3) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
      )}
    </motion.div>
  )
}