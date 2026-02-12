import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const animalEmojis = {
  butterfly: '🦋',
  bunny: '🐰',
  cat: '🐱',
  swan: '🦢'
}

export default function CaveTransformation({ animal, receiverImageUrl, onComplete }) {
  const [phase, setPhase] = useState('landing')

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('running'), 2000)
    const timer2 = setTimeout(() => setPhase('cave'), 4000)
    const timer3 = setTimeout(() => setPhase('transform'), 6000)
    const timer4 = setTimeout(() => setPhase('reveal'), 8000)
    const timer5 = setTimeout(() => onComplete(), 11000)

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
          ? 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #2d1b3d 100%)'
          : 'linear-gradient(135deg, #87CEEB 0%, #90EE90 100%)',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 2s ease'
      }}
    >
      {/* LANDING PHASE */}
      {phase === 'landing' && (
        <>
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
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 0.8, repeat: 2 }}
              style={{ fontSize: '80px' }}
            >
              🧑
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', bounce: 0.6 }}
              style={{ fontSize: '70px' }}
            >
              {animalEmojis[animal]}
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              position: 'absolute',
              bottom: '30%',
              fontSize: '32px',
              color: '#333',
              fontStyle: 'italic',
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            They landed safely together... 💕
          </motion.p>
        </>
      )}

      {/* RUNNING TO CAVE PHASE */}
      {phase === 'running' && (
        <>
          {/* Animal running */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: window.innerWidth * 0.5 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: '20%',
              top: '50%',
              fontSize: '70px',
              zIndex: 2
            }}
          >
            {animalEmojis[animal]}
          </motion.div>

          {/* MYSTERIOUS CAVE - GLOWING */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: window.innerWidth }}
            animate={{ opacity: 1, scale: 1, x: window.innerWidth * 0.6 }}
            transition={{ duration: 1.2 }}
            style={{
              position: 'absolute',
              right: '15%',
              top: '40%',
              fontSize: '150px',
              zIndex: 1,
              filter: 'drop-shadow(0 0 30px rgba(138, 43, 226, 0.8))'
            }}
          >
            🕳️
          </motion.div>

          {/* Glowing particles around cave */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                x: [0, (Math.random() - 0.5) * 100],
                y: [0, (Math.random() - 0.5) * 100]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
              style={{
                position: 'absolute',
                right: '20%',
                top: '45%',
                fontSize: '30px'
              }}
            >
              ✨
            </motion.div>
          ))}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute',
              bottom: '25%',
              fontSize: '28px',
              color: '#333',
              fontStyle: 'italic',
              fontWeight: 'bold'
            }}
          >
            A mysterious glowing cave appears...
          </motion.p>
        </>
      )}

      {/* INSIDE THE CAVE */}
      {(phase === 'cave' || phase === 'transform' || phase === 'reveal') && (
        <>
          {/* Dark cave background */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at center, #2d2d44 0%, #0a0a1a 100%)',
            zIndex: 0
          }} />

          {/* Stalactites - MORE REALISTIC */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -150, opacity: 0 }}
              animate={{ y: 0, opacity: 0.7 }}
              transition={{ delay: 0.1 * i, duration: 0.8 }}
              style={{
                position: 'absolute',
                top: 0,
                left: `${5 + i * 8}%`,
                width: '25px',
                height: `${60 + Math.random() * 80}px`,
                background: 'linear-gradient(180deg, #666 0%, #444 50%, #333 100%)',
                clipPath: 'polygon(50% 0%, 30% 20%, 20% 40%, 10% 60%, 0% 80%, 0% 100%, 100% 100%, 100% 80%, 90% 60%, 80% 40%, 70% 20%)',
                opacity: 0.6,
                filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.5))'
              }}
            />
          ))}

          {/* Cave floor glow */}
          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2]
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
              background: 'radial-gradient(ellipse at bottom, rgba(138,43,226,0.4) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />
        </>
      )}

      {/* TRANSFORMATION PHASE - EPIC MAGIC */}
      {phase === 'transform' && (
        <>
          {/* MASSIVE magical glow */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 2, 1.5],
              opacity: [0, 1, 0.8]
            }}
            transition={{ duration: 2 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(255,215,0,1) 0%, rgba(255,105,180,0.6) 40%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(50px)',
              zIndex: 1
            }}
          />

          {/* SPARKLE EXPLOSION */}
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                scale: 0,
                opacity: 0
              }}
              animate={{
                x: window.innerWidth / 2 + (Math.random() - 0.5) * 600,
                y: window.innerHeight / 2 + (Math.random() - 0.5) * 600,
                scale: [0, 2, 0],
                opacity: [0, 1, 0],
                rotate: Math.random() * 360
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 0.5,
                ease: 'easeOut'
              }}
              style={{
                position: 'absolute',
                fontSize: '35px',
                zIndex: 2
              }}
            >
              ✨
            </motion.div>
          ))}

          {/* Animal disappearing */}
          <motion.div
            animate={{
              scale: [1, 1.5, 0],
              rotate: [0, 180, 360],
              opacity: [1, 0.7, 0]
            }}
            transition={{ duration: 2 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '120px',
              zIndex: 2
            }}
          >
            {animalEmojis[animal]}
          </motion.div>

          {/* Magical text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              position: 'absolute',
              top: '70%',
              fontSize: '36px',
              color: '#FFD700',
              fontStyle: 'italic',
              textShadow: '0 0 30px rgba(255,215,0,1)',
              fontWeight: 'bold',
              zIndex: 3
            }}
          >
            The magic is happening... ✨
          </motion.p>
        </>
      )}

      {/* REVEAL PHASE - THE BIG MOMENT */}
      {phase === 'reveal' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          style={{
            position: 'relative',
            zIndex: 3,
            textAlign: 'center'
          }}
        >
          {/* GLOWING HALO - BIGGER */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '450px',
              height: '450px',
              background: 'radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,105,180,0.4) 50%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(40px)',
              zIndex: 1
            }}
          />

          {/* THE IMAGE - BEAUTIFUL REVEAL */}
          <motion.div
            initial={{ filter: 'blur(30px)', opacity: 0, scale: 0.5 }}
            animate={{ filter: 'blur(0px)', opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            style={{
              position: 'relative',
              zIndex: 2
            }}
          >
            <img
              src={receiverImageUrl}
              alt="Beautiful transformation"
              style={{
                width: '320px',
                height: '320px',
                objectFit: 'cover',
                borderRadius: '50%',
                border: '8px solid rgba(255,215,0,1)',
                boxShadow: '0 0 80px rgba(255,215,0,0.8), 0 0 120px rgba(255,105,180,0.6)',
                marginBottom: '40px'
              }}
            />
          </motion.div>

          {/* Rotating sparkles around image */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.2
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '400px',
                height: '400px',
                transform: 'translate(-50%, -50%)',
                zIndex: 2
              }}
            >
              <div style={{
                position: 'absolute',
                top: `${50 + 45 * Math.cos((i * Math.PI * 2) / 8)}%`,
                left: `${50 + 45 * Math.sin((i * Math.PI * 2) / 8)}%`,
                fontSize: '30px',
                transform: 'translate(-50%, -50%)'
              }}>
                ✨
              </div>
            </motion.div>
          ))}

          {/* REVEAL TEXT */}
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            style={{
              fontSize: '52px',
              color: '#FFD700',
              fontWeight: 'bold',
              textShadow: '0 0 40px rgba(255,215,0,1)',
              marginBottom: '20px',
              position: 'relative',
              zIndex: 2
            }}
          >
            The Transformation ✨
          </motion.h2>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3 }}
            style={{
              fontSize: '32px',
              color: '#FFB6C1',
              fontStyle: 'italic',
              textShadow: '0 0 25px rgba(255,182,193,0.8)',
              position: 'relative',
              zIndex: 2,
              fontWeight: 'bold'
            }}
          >
            The {animal} was you all along! 💕
          </motion.p>

          {/* Rising hearts */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: 0,
                y: 0,
                opacity: 0
              }}
              animate={{
                x: (Math.random() - 0.5) * 400,
                y: -300,
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 4,
                delay: 1.5 + Math.random() * 1,
                repeat: Infinity,
                repeatDelay: Math.random() * 3
              }}
              style={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                fontSize: '28px',
                pointerEvents: 'none'
              }}
            >
              💖
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}