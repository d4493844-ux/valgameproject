import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'

const persuasionMessages = [
  "Give me one chance? 🥺",
  "Let me prove it to you... 💕",
  "Just smile for me first? 😊",
  "I promise to make you happy... 🌸",
  "One date, that's all I ask... 🌹",
  "You know you want to say yes... 😉",
  "Pretty please with cherry on top? 🍒",
  "I'll wait as long as it takes... ⏰",
  "My heart is in your hands... 💖"
]

export default function ProposalScene({ receiverName, onAccepted }) {
  const [response, setResponse] = useState(null)
  const [persuasionIndex, setPersuasionIndex] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [yesButtonStyle, setYesButtonStyle] = useState({})

  const handleYes = () => {
    setResponse('yes')
    setShowConfetti(true)
    onAccepted(true)
  }

  const handleNo = () => {
    // Don't set response to 'no', just cycle persuasion
    setPersuasionIndex((prev) => (prev + 1) % persuasionMessages.length)
    
    // Make YES button more tempting
    setYesButtonStyle({
      transform: 'scale(1.1)',
      boxShadow: '0 0 40px rgba(255,20,147,0.8)',
      animation: 'pulse 0.5s ease-in-out'
    })
    
    setTimeout(() => {
      setYesButtonStyle({})
    }, 500)
  }

  if (response === 'yes') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FFE5F3 0%, #FFD1DC 50%, #FFC0CB 100%)',
          padding: '20px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Confetti explosion */}
        {showConfetti && (
          <>
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  opacity: 1,
                  scale: 1
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: [window.innerHeight / 2, window.innerHeight + 100],
                  opacity: 0,
                  rotate: Math.random() * 720,
                  scale: [1, 1.5, 0.5]
                }}
                transition={{
                  duration: 2 + Math.random(),
                  ease: 'easeOut',
                  delay: Math.random() * 0.3
                }}
                style={{
                  position: 'absolute',
                  fontSize: `${20 + Math.random() * 20}px`,
                  pointerEvents: 'none',
                  zIndex: 10
                }}
              >
                {['💕', '💖', '💗', '💝', '🌸', '🌺', '🌹', '✨', '💐', '🎀'][Math.floor(Math.random() * 10)]}
              </motion.div>
            ))}
          </>
        )}

        {/* Blooming flower animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring', bounce: 0.5 }}
          style={{
            fontSize: '200px',
            marginBottom: '40px',
            filter: 'drop-shadow(0 0 30px rgba(255,105,180,0.6))'
          }}
        >
          🌹
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: '64px',
            background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          She Said YES! 💕
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            fontSize: '32px',
            color: '#ff69b4',
            textAlign: 'center',
            marginBottom: '40px',
            fontStyle: 'italic'
          }}
        >
          {receiverName}, you've made me the happiest! ✨
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
          style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(255,105,180,0.3)',
            textAlign: 'center',
            maxWidth: '500px'
          }}
        >
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>💑</div>
          <p style={{
            fontSize: '24px',
            color: '#333',
            lineHeight: '1.6',
            marginBottom: '20px'
          }}>
            This Valentine's Day will be magical because you're in it.
          </p>
          <p style={{
            fontSize: '18px',
            color: '#666',
            fontStyle: 'italic'
          }}>
            Get ready for the best date ever! 🎉
          </p>
        </motion.div>

        {/* Floating hearts */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50
            }}
            animate={{
              y: -100,
              x: Math.random() * window.innerWidth
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              fontSize: '40px',
              opacity: 0.4,
              pointerEvents: 'none'
            }}
          >
            💕
          </motion.div>
        ))}
      </motion.div>
    )
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
        background: 'linear-gradient(135deg, #FFE5F3 0%, #FFF0F5 100%)',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Rose petals falling */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -50,
            rotate: 0
          }}
          animate={{
            y: window.innerHeight + 50,
            rotate: 360,
            x: Math.random() * window.innerWidth
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            fontSize: '40px',
            opacity: 0.3,
            pointerEvents: 'none'
          }}
        >
          🌸
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: 'center',
          background: 'white',
          padding: '60px 40px',
          borderRadius: '30px',
          boxShadow: '0 30px 80px rgba(255,105,180,0.2)',
          maxWidth: '600px',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Kneeling person */}
        <motion.div
          animate={{
            y: [0, -10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            fontSize: '120px',
            marginBottom: '30px'
          }}
        >
          🧎
        </motion.div>

        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
          style={{
            fontSize: '80px',
            marginBottom: '30px'
          }}
        >
          🌹
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: '48px',
            background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px',
            fontWeight: 'bold'
          }}
        >
          {receiverName},
        </motion.h1>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: '36px',
            color: '#ff69b4',
            marginBottom: '40px',
            fontStyle: 'italic'
          }}
        >
          Will you be my Valentine? 💕
        </motion.h2>

        {/* Persuasion message (shown after NO clicks) */}
        <AnimatePresence mode="wait">
          {persuasionIndex > 0 && (
            <motion.div
              key={persuasionIndex}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                marginBottom: '30px',
                padding: '20px',
                background: 'linear-gradient(135deg, #FFE5F3 0%, #FFF0F5 100%)',
                borderRadius: '15px',
                fontSize: '22px',
                color: '#ff1493',
                fontWeight: '500'
              }}
            >
              {persuasionMessages[persuasionIndex]}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYes}
            style={{
              padding: '20px 50px',
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(255,20,147,0.4)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.3s',
              ...yesButtonStyle
            }}
          >
            <Heart size={28} fill="white" />
            Yes! 💕
          </motion.button>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNo}
            style={{
              padding: '20px 50px',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#999',
              background: 'white',
              border: '3px solid #ddd',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              transition: 'all 0.3s'
            }}
          >
            {persuasionIndex === 0 ? 'Hmm...' : 'Still thinking...'}
          </motion.button>
        </div>

        {/* Hint text */}
        {persuasionIndex > 2 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginTop: '30px',
              fontSize: '16px',
              color: '#999',
              fontStyle: 'italic'
            }}
          >
            (You know you want to say yes... 😊)
          </motion.p>
        )}

        {/* Sparkles around buttons */}
        {persuasionIndex > 4 && (
          <>
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                style={{
                  position: 'absolute',
                  left: `${20 + Math.random() * 60}%`,
                  top: `${40 + Math.random() * 20}%`,
                  fontSize: '24px',
                  pointerEvents: 'none'
                }}
              >
                ✨
              </motion.div>
            ))}
          </>
        )}
      </motion.div>

      {/* Ambient floating hearts */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`ambient-${i}`}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: '40px',
            opacity: 0.15,
            pointerEvents: 'none'
          }}
        >
          💕
        </motion.div>
      ))}
    </motion.div>
  )
}