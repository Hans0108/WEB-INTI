import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Magazine from './pages/Magazine';
import ArticleView from './pages/ArticleView';
import Admin from './pages/Admin';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-off-white">
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/magazine" element={<Magazine />} />
            <Route path="/magazine/article/:id" element={<ArticleView />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
