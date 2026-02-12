import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'

const persuasionMessages = [
  "Give me one chance? 🥺",
  "Let me prove it to you... 💕",
  "Just one smile first? 😊",
  "I promise to make you happy... 🌸",
  "One date, that's all I ask... 🌹",
  "You know you want to say yes... 😉",
  "Pretty please with cherry on top? 🍒",
  "I'll wait as long as it takes... ⏰",
  "My heart belongs to you... 💖",
  "Just give us a chance... 🌟",
  "You're making this so hard... 😅",
  "The YES button is calling you... 💕"
]

export default function ProposalScene({ receiverName, onAccepted }) {
  const [response, setResponse] = useState(null)
  const [persuasionIndex, setPersuasionIndex] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [yesButtonStyle, setYesButtonStyle] = useState({})
  const [noClickCount, setNoClickCount] = useState(0)

  const handleYes = () => {
    setResponse('yes')
    setShowConfetti(true)
    onAccepted(true)
  }

  const handleNo = () => {
    setNoClickCount(prev => prev + 1)
    setPersuasionIndex((prev) => (prev + 1) % persuasionMessages.length)
    
    // Make YES button more tempting with each NO
    setYesButtonStyle({
      transform: `scale(${1.1 + noClickCount * 0.05})`,
      boxShadow: `0 0 ${40 + noClickCount * 10}px rgba(255,20,147,${0.8 + noClickCount * 0.05})`,
      animation: 'pulse 0.5s ease-in-out'
    })
    
    setTimeout(() => {
      setYesButtonStyle({
        transform: `scale(${1 + noClickCount * 0.03})`
      })
    }, 500)
  }

  // SUCCESS SCREEN
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
        {/* MASSIVE CONFETTI EXPLOSION */}
        {showConfetti && (
          <>
            {[...Array(150)].map((_, i) => (
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
                  rotate: Math.random() * 1080,
                  scale: [1, 2, 0.5]
                }}
                transition={{
                  duration: 2.5 + Math.random(),
                  ease: 'easeOut',
                  delay: Math.random() * 0.5
                }}
                style={{
                  position: 'absolute',
                  fontSize: `${25 + Math.random() * 25}px`,
                  pointerEvents: 'none',
                  zIndex: 10
                }}
              >
                {['💕', '💖', '💗', '💝', '🌸', '🌺', '🌹', '✨', '💐', '🎀', '⭐', '🌟'][Math.floor(Math.random() * 12)]}
              </motion.div>
            ))}
          </>
        )}

        {/* BLOOMING ROSE */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, type: 'spring', bounce: 0.6 }}
          style={{
            fontSize: '220px',
            marginBottom: '40px',
            filter: 'drop-shadow(0 0 40px rgba(255,105,180,0.8))'
          }}
        >
          🌹
        </motion.div>

        {/* SUCCESS MESSAGE */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: '72px',
            background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px',
            fontWeight: 'bold',
            textAlign: 'center',
            filter: 'drop-shadow(0 0 20px rgba(255,20,147,0.5))'
          }}
        >
          SHE SAID YES! 💕
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            fontSize: '38px',
            color: '#ff69b4',
            textAlign: 'center',
            marginBottom: '50px',
            fontStyle: 'italic',
            fontWeight: 'bold'
          }}
        >
          {receiverName}, you've made me the happiest person alive! ✨
        </motion.p>

        {/* CELEBRATION CARD */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1, type: 'spring' }}
          style={{
            background: 'white',
            padding: '50px',
            borderRadius: '30px',
            boxShadow: '0 30px 80px rgba(255,105,180,0.4)',
            textAlign: 'center',
            maxWidth: '600px'
          }}
        >
          <div style={{ fontSize: '100px', marginBottom: '25px' }}>💑</div>
          <p style={{
            fontSize: '28px',
            color: '#333',
            lineHeight: '1.6',
            marginBottom: '25px'
          }}>
            This Valentine's Day will be absolutely magical because you're in it.
          </p>
          <p style={{
            fontSize: '22px',
            color: '#666',
            fontStyle: 'italic'
          }}>
            Get ready for the most amazing date ever! 🎉✨
          </p>
        </motion.div>

        {/* FLOATING HEARTS EVERYWHERE */}
        {[...Array(25)].map((_, i) => (
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
              fontSize: '50px',
              opacity: 0.4,
              pointerEvents: 'none'
            }}
          >
            💕
          </motion.div>
        ))}

        {/* Fireworks effect */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`firework-${i}`}
            animate={{
              scale: [0, 3, 0],
              opacity: [1, 0.8, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeOut'
            }}
            style={{
              position: 'absolute',
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: ['#ff69b4', '#FFD700', '#ff1493', '#FFA500'][i % 4],
              boxShadow: `0 0 30px ${['#ff69b4', '#FFD700', '#ff1493', '#FFA500'][i % 4]}`
            }}
          />
        ))}
      </motion.div>
    )
  }

  // PROPOSAL SCREEN
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
      {/* ROSE PETALS FALLING */}
      {[...Array(20)].map((_, i) => (
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
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            fontSize: '45px',
            opacity: 0.3,
            pointerEvents: 'none'
          }}
        >
          🌸
        </motion.div>
      ))}

      {/* PROPOSAL CARD */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: 'center',
          background: 'white',
          padding: '70px 50px',
          borderRadius: '40px',
          boxShadow: '0 40px 100px rgba(255,105,180,0.25)',
          maxWidth: '700px',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* KNEELING PERSON */}
        <motion.div
          animate={{
            y: [0, -12, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            fontSize: '140px',
            marginBottom: '35px'
          }}
        >
          🧎
        </motion.div>

        {/* ROSE WITH ANIMATION */}
        <motion.div
          animate={{
            rotate: [0, 15, -15, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity
          }}
          style={{
            fontSize: '100px',
            marginBottom: '40px',
            filter: 'drop-shadow(0 0 20px rgba(255,20,147,0.6))'
          }}
        >
          🌹
        </motion.div>

        {/* NAME */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: '58px',
            background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '25px',
            fontWeight: 'bold'
          }}
        >
          {receiverName},
        </motion.h1>

        {/* PROPOSAL QUESTION */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: '44px',
            color: '#ff69b4',
            marginBottom: '50px',
            fontStyle: 'italic',
            fontWeight: 'bold'
          }}
        >
          Will you be my Valentine? 💕
        </motion.h2>

        {/* PERSUASION MESSAGE */}
        <AnimatePresence mode="wait">
          {persuasionIndex > 0 && (
            <motion.div
              key={persuasionIndex}
              initial={{ scale: 0.5, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              style={{
                marginBottom: '40px',
                padding: '25px',
                background: 'linear-gradient(135deg, #FFE5F3 0%, #FFF0F5 100%)',
                borderRadius: '20px',
                fontSize: '26px',
                color: '#ff1493',
                fontWeight: '600',
                border: '3px solid #ff69b4'
              }}
            >
              {persuasionMessages[persuasionIndex]}
            </motion.div>
          )}
        </AnimatePresence>

        {/* BUTTONS */}
        <div style={{
          display: 'flex',
          gap: '25px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {/* YES BUTTON - GETS BIGGER */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYes}
            style={{
              padding: '25px 60px',
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'white',
              background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
              border: 'none',
              borderRadius: '60px',
              cursor: 'pointer',
              boxShadow: '0 15px 40px rgba(255,20,147,0.5)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.3s',
              ...yesButtonStyle
            }}
          >
            <Heart size={32} fill="white" />
            YES! 💕
          </motion.button>

          {/* NO BUTTON - GETS SMALLER */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              scale: Math.max(0.7, 1 - noClickCount * 0.05) // Shrinks with each click
            }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: Math.max(0.75, 1.05 - noClickCount * 0.05) }}
            whileTap={{ scale: Math.max(0.65, 0.95 - noClickCount * 0.05) }}
            onClick={handleNo}
            style={{
              padding: '25px 60px',
              fontSize: `${32 - noClickCount * 2}px`, // Text gets smaller
              fontWeight: 'bold',
              color: '#999',
              background: 'white',
              border: '3px solid #ddd',
              borderRadius: '60px',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
              transition: 'all 0.3s'
            }}
          >
            {persuasionIndex === 0 ? 'Hmm... 🤔' : persuasionIndex < 5 ? 'Still thinking... 😅' : 'Maybe... 😳'}
          </motion.button>
        </div>

        {/* HINT TEXT - APPEARS AFTER 3 NOs */}
        {persuasionIndex > 2 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginTop: '35px',
              fontSize: '20px',
              color: '#999',
              fontStyle: 'italic'
            }}
          >
            (The YES button is getting more tempting... 😊)
          </motion.p>
        )}

        {/* EXTRA SPARKLES AFTER 5 NOs */}
        {persuasionIndex > 5 && (
          <>
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -25, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.15
                }}
                style={{
                  position: 'absolute',
                  left: `${15 + Math.random() * 70}%`,
                  top: `${30 + Math.random() * 30}%`,
                  fontSize: '28px',
                  pointerEvents: 'none'
                }}
              >
                ✨
              </motion.div>
            ))}
          </>
        )}
      </motion.div>

      {/* AMBIENT FLOATING HEARTS */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`ambient-${i}`}
          animate={{
            y: [0, -35, 0],
            x: [0, 25, 0],
            rotate: [0, 15, -15, 0]
          }}
          transition={{
            duration: 5 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: '45px',
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