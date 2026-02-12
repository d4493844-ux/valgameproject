import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const animals = [
  {
    id: 'butterfly',
    emoji: '🦋',
    name: 'Butterfly',
    traits: 'Gentle, dreamy, free-spirited',
    color: '#E6B0FF'
  },
  {
    id: 'bunny',
    emoji: '🐰',
    name: 'Bunny',
    traits: 'Cute, playful, affectionate',
    color: '#FFB6D9'
  },
  {
    id: 'cat',
    emoji: '🐱',
    name: 'Cat',
    traits: 'Elegant, mysterious, graceful',
    color: '#FFC9A8'
  },
  {
    id: 'swan',
    emoji: '🦢',
    name: 'Swan',
    traits: 'Graceful, calm, beautiful',
    color: '#B4E4FF'
  }
]

export default function AnimalSelection({ onAnimalChosen }) {
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
        background: 'linear-gradient(135deg, #fff5e6 0%, #ffe5f3 100%)',
        padding: '40px 20px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background sparkles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2
          }}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: '20px'
          }}
        >
          ✨
        </motion.div>
      ))}

      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: 'center',
          marginBottom: '50px',
          zIndex: 1
        }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ fontSize: '80px', marginBottom: '20px' }}
        >
          🌟
        </motion.div>

        <h1 style={{
          fontSize: '42px',
          background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '15px',
          fontWeight: 'bold'
        }}>
          Which animal represents your personality?
        </h1>

        <p style={{
          fontSize: '18px',
          color: '#666',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Choose the one that resonates with your spirit...
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px',
        maxWidth: '1000px',
        width: '100%',
        zIndex: 1
      }}>
        {animals.map((animal, index) => (
          <motion.div
            key={animal.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ 
              scale: 1.05,
              y: -10,
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAnimalChosen(animal.id)}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '40px 30px',
              cursor: 'pointer',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              border: '3px solid transparent',
              transition: 'all 0.3s',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = animal.color
              e.currentTarget.style.background = `linear-gradient(135deg, white 0%, ${animal.color}20 100%)`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent'
              e.currentTarget.style.background = 'white'
            }}
          >
            {/* Animated background glow */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '150px',
                height: '150px',
                background: `radial-gradient(circle, ${animal.color}40 0%, transparent 70%)`,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />

            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{ 
                fontSize: '80px',
                marginBottom: '20px',
                position: 'relative',
                zIndex: 1
              }}
            >
              {animal.emoji}
            </motion.div>

            <h3 style={{
              fontSize: '28px',
              color: '#333',
              marginBottom: '10px',
              fontWeight: 'bold',
              position: 'relative',
              zIndex: 1
            }}>
              {animal.name}
            </h3>

            <p style={{
              fontSize: '16px',
              color: '#666',
              fontStyle: 'italic',
              position: 'relative',
              zIndex: 1
            }}>
              {animal.traits}
            </p>

            <motion.div
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              style={{
                height: '3px',
                background: `linear-gradient(90deg, ${animal.color}, transparent)`,
                marginTop: '20px',
                borderRadius: '2px'
              }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          marginTop: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#999',
          fontSize: '14px'
        }}
      >
        <Sparkles size={16} />
        <span>Tap on any animal to begin your adventure</span>
      </motion.div>
    </motion.div>
  )
}