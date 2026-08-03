import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GrainOverlay from './components/GrainOverlay'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import FeaturedWorkPage from './pages/FeaturedWorkPage'
import CaseStudyPage from './pages/CaseStudyPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GrainOverlay />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/visual-work" element={<FeaturedWorkPage />} />
        <Route path="/case/:slug" element={<CaseStudyPage />} />
      </Routes>
    </BrowserRouter>
  )
}
