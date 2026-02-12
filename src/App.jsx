import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateQuest from './scenes/CreateQuest'
import QuestExperience from './scenes/QuestExperience'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateQuest />} />
        <Route path="/quest/:questId" element={<QuestExperience />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App