import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import BiographyPage from './components/biography/biography'
import EducationPage from './components/education/education'
import PreferencesPage from './components/preferences/preferences'
import SkillsPage from './components/skills/skills'
import ContactsPage from './components/contacts/contacts'
import Footer from './components/footer/footer'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BiographyPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/preferences" element={<PreferencesPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  )
}

export default App
