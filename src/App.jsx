import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './sections/Navbar'
import Footer from './sections/Footer'
import Home from './pages/Home'
import Work from './pages/Work'
import DetailsPage from './pages/DetailsPage'
import ContactPage from './pages/ContactPage'

const App = () => {
  return (
    <Router>
      <div className="container mx-auto max-w-7xl">
        <Navbar />
        <main className="mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/details" element={<DetailsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App