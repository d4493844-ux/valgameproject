import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Upload, Sparkles, Send } from 'lucide-react'
import { supabase } from '../utils/supabase'

export default function CreateQuest() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    senderName: '',
    receiverName: '',
    receiverImage: null
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be less than 5MB')
        return
      }
      setFormData({ ...formData, receiverImage: file })
      setImagePreview(URL.createObjectURL(file))
      setError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!formData.receiverName.trim()) {
      setError('Please enter receiver name')
      return
    }
    
    if (!formData.receiverImage) {
      setError('Please upload a photo of your special someone')
      return
    }

    setLoading(true)

    try {
      const fileExt = formData.receiverImage.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('receiver-images')
        .upload(fileName, formData.receiverImage)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('receiver-images')
        .getPublicUrl(fileName)

      const { data: questData, error: questError } = await supabase
        .from('valentine_quests')
        .insert([
          {
            sender_name: formData.senderName.trim() || 'Someone special',
            receiver_name: formData.receiverName.trim(),
            receiver_image_url: publicUrl
          }
        ])
        .select()
        .single()

      if (questError) throw questError

      const questUrl = `${window.location.origin}/quest/${questData.id}`
      
      await navigator.clipboard.writeText(questUrl)

      alert(`✨ Quest created! Link copied to clipboard!\n\nShare this link: ${questUrl}`)
      
    } catch (err) {
      console.error('Error creating quest:', err)
      setError(err.message || 'Failed to create quest. Please check your Supabase setup.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'linear-gradient(135deg, #ffeef8 0%, #ffe5f3 50%, #fff0f5 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '100vh', x: Math.random() * window.innerWidth }}
          animate={{
            y: '-20vh',
            x: Math.random() * window.innerWidth
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            fontSize: '24px',
            opacity: 0.15,
            pointerEvents: 'none'
          }}
        >
          💕
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'white',
          borderRadius: '24px',
          padding: '40px',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(255, 105, 180, 0.15)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ display: 'inline-block', fontSize: '60px', marginBottom: '10px' }}
          >
            💝
          </motion.div>
          <h1 style={{ 
            fontSize: '32px', 
            color: '#ff1493', 
            marginBottom: '10px',
            fontWeight: 'bold'
          }}>
            Create Your Valentine Quest
          </h1>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Send a magical romantic experience to someone special
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#333',
              fontWeight: '500',
              fontSize: '14px'
            }}>
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={formData.senderName}
              onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
              placeholder="Anonymous admirer"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '2px solid #ffe5f3',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#ff69b4'}
              onBlur={(e) => e.target.style.borderColor = '#ffe5f3'}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#333',
              fontWeight: '500',
              fontSize: '14px'
            }}>
              Their Name <span style={{ color: '#ff1493' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.receiverName}
              onChange={(e) => setFormData({ ...formData, receiverName: e.target.value })}
              placeholder="e.g., Sarah"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '2px solid #ffe5f3',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#ff69b4'}
              onBlur={(e) => e.target.style.borderColor = '#ffe5f3'}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#333',
              fontWeight: '500',
              fontSize: '14px'
            }}>
              Their Photo <span style={{ color: '#ff1493' }}>*</span>
            </label>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
              Upload a beautiful photo - it will be revealed in the magical cave scene
            </p>
            
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="imageUpload"
              required
            />
            
            <label
              htmlFor="imageUpload"
              style={{
                display: 'block',
                padding: '40px',
                borderRadius: '12px',
                border: '2px dashed #ff69b4',
                textAlign: 'center',
                cursor: 'pointer',
                background: imagePreview ? 'transparent' : '#fff5fb',
                transition: 'all 0.3s',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    borderRadius: '8px'
                  }}
                />
              ) : (
                <div>
                  <Upload size={40} color="#ff69b4" style={{ margin: '0 auto 10px' }} />
                  <p style={{ color: '#ff69b4', fontWeight: '500' }}>
                    Click to upload photo
                  </p>
                  <p style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                    Max 5MB
                  </p>
                </div>
              )}
            </label>
          </div>

          {error && (
            <div style={{
              padding: '12px',
              background: '#ffe5e5',
              color: '#d00',
              borderRadius: '8px',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            style={{
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              background: loading 
                ? 'linear-gradient(135deg, #ccc 0%, #999 100%)'
                : 'linear-gradient(135deg, #ff69b4 0%, #ff1493 100%)',
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 15px rgba(255, 20, 147, 0.3)',
              transition: 'all 0.3s'
            }}
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles size={20} />
                </motion.div>
                Creating Magic...
              </>
            ) : (
              <>
                <Send size={20} />
                Create Quest
              </>
            )}
          </motion.button>
        </form>

        <div style={{
          marginTop: '20px',
          padding: '16px',
          background: '#fff5fb',
          borderRadius: '12px',
          fontSize: '13px',
          color: '#666',
          textAlign: 'center'
        }}>
          <Sparkles size={16} style={{ display: 'inline', marginRight: '5px' }} />
          Your quest link will be copied to clipboard when ready
        </div>
      </motion.div>
    </div>
  )
}