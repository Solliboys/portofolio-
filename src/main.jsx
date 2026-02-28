import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import "animate.css"
import AOS from 'aos';
import 'aos/dist/aos.css';

// Konfigurasi AOS agar durasi default lebih cepat
AOS.init({
  duration: 600, // Mempercepat durasi animasi global (dari 1000 ke 600)
  once: true
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="container mx-auto px-6">
      <Navbar />
      <App />
      <Footer />
    </div>
  </StrictMode>,
)
