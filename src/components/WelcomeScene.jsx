import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const floatingAnimals = [
  { emoji: '🦋', name: 'butterfly', delay: 0 },
  { emoji: '🐰', name: 'bunny', delay: 0.2 },
  { emoji: '🐱', name: 'cat', delay: 0.4 },
  { emoji: '🦢', name: 'swan', delay: 0.6 },
  { emoji: '🌸', name: 'flower', delay: 0.8 },
  { emoji: '🦋', name: 'butterfly2', delay: 1 },
]

export default function WelcomeScene({ receiverName, onComplete }) {
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
        background: 'linear-gradient(135deg, #ffeef8 0%, #ffe5f3 50%, #fff0f5 100%)',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {floatingAnimals.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            scale: 0
          }}
          animate={{
            y: Math.random() * window.innerHeight,
            x: Math.random() * window.innerWidth,
            scale: 1
          }}
          transition={{
            duration: 2,
            delay: item.delay,
            ease: 'easeOut'
          }}
          style={{
            position: 'absolute',
            fontSize: '60px',
            opacity: 0.3,
            pointerEvents: 'none',
            zIndex: 0
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {floatingAnimals.map((item, index) => (
        <motion.div
          key={`float-${item.name}`}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            fontSize: '50px',
            left: `${10 + index * 15}%`,
            top: `${20 + (index % 3) * 25}%`,
            opacity: 0.25,
            pointerEvents: 'none',
            zIndex: 0
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          textAlign: 'center',
          zIndex: 1,
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '60px 40px',
          borderRadius: '30px',
          boxShadow: '0 30px 80px rgba(255, 105, 180, 0.2)',
          backdropFilter: 'blur(10px)',
          maxWidth: '600px'
        }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{ 
            fontSize: '100px',
            marginBottom: '20px',
            display: 'inline-block'
          }}
        >
          💕
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: '48px',
            background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px',
            fontWeight: 'bold'
          }}
        >
          Hello, {receiverName}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            fontSize: '22px',
            color: '#666',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}
        >
          Someone special has prepared a magical journey just for you...
        </motion.p>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          style={{
            padding: '18px 50px',
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'white',
            background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(255, 20, 147, 0.4)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          Begin Journey
          <Heart size={24} fill="white" />
        </motion.button>
      </motion.div>

      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [-20, -100]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeOut'
          }}
          style={{
            position: 'absolute',
            bottom: '10%',
            left: `${10 + i * 10}%`,
            fontSize: '24px',
            pointerEvents: 'none'
          }}
        >
          ✨
        </motion.div>
      ))}
    </motion.div>
  )
}