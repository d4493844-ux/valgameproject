import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import { supabase } from '../utils/supabase'
import WelcomeScene from '../components/WelcomeScene'
import AnimalSelection from '../components/AnimalSelection'
import ChaseScene from '../components/ChaseScene'
import CliffFall from '../components/CliffFall'
import CaveTransformation from '../components/CaveTransformation'
import ProposalScene from '../components/ProposalScene'

export default function QuestExperience() {
  const { questId } = useParams()
  const [quest, setQuest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentScene, setCurrentScene] = useState(0)
  const [chosenAnimal, setChosenAnimal] = useState(null)

  useEffect(() => {
    loadQuest()
  }, [questId])

  const loadQuest = async () => {
    try {
      const { data, error } = await supabase
        .from('valentine_quests')
        .select('*')
        .eq('id', questId)
        .single()

      if (error) throw error
      
      setQuest(data)
      
      if (data.chosen_animal) {
        setChosenAnimal(data.chosen_animal)
        setCurrentScene(2)
      }
    } catch (err) {
      console.error('Error loading quest:', err)
      alert('Quest not found. Please check the link.')
    } finally {
      setLoading(false)
    }
  }

  const handleAnimalChosen = async (animal) => {
    setChosenAnimal(animal)
    
    await supabase
      .from('valentine_quests')
      .update({ chosen_animal: animal })
      .eq('id', questId)
    
    nextScene()
  }

  const handleAccepted = async (accepted) => {
    await supabase
      .from('valentine_quests')
      .update({ accepted })
      .eq('id', questId)
  }

  const nextScene = () => {
    setCurrentScene(prev => prev + 1)
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ffeef8 0%, #ffe5f3 100%)'
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Heart size={60} color="#ff69b4" fill="#ff69b4" />
        </motion.div>
      </div>
    )
  }

  if (!quest) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ffeef8 0%, #ffe5f3 100%)',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>💔</h1>
          <h2 style={{ color: '#ff1493', marginBottom: '10px' }}>Quest Not Found</h2>
          <p style={{ color: '#666' }}>This Valentine quest doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {currentScene === 0 && (
        <WelcomeScene 
          key="welcome"
          receiverName={quest.receiver_name}
          onComplete={nextScene}
        />
      )}
      
      {currentScene === 1 && (
        <AnimalSelection
          key="selection"
          onAnimalChosen={handleAnimalChosen}
        />
      )}
      
      {currentScene === 2 && chosenAnimal && (
        <ChaseScene
          key="chase"
          animal={chosenAnimal}
          onComplete={nextScene}
        />
      )}
      
      {currentScene === 3 && (
        <CliffFall
          key="cliff"
          animal={chosenAnimal}
          onComplete={nextScene}
        />
      )}
      
      {currentScene === 4 && (
        <CaveTransformation
          key="cave"
          animal={chosenAnimal}
          receiverImageUrl={quest.receiver_image_url}
          onComplete={nextScene}
        />
      )}
      
      {currentScene === 5 && (
        <ProposalScene
          key="proposal"
          receiverName={quest.receiver_name}
          onAccepted={handleAccepted}
        />
      )}
    </AnimatePresence>
  )
}