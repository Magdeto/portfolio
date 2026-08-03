import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GrainOverlay from './components/GrainOverlay'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import FeaturedWorkPage from './pages/FeaturedWorkPage'
import CaseStudyPage from './pages/CaseStudyPage'

export default function App() {
  return (
    <BrowserRouter>
      <GrainOverlay />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<FeaturedWorkPage />} />
        <Route path="/case/:slug" element={<CaseStudyPage />} />
      </Routes>
    </BrowserRouter>
  )
}
