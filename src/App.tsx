import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Magazine from './pages/Magazine';
import ArticleView from './pages/ArticleView';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-off-white">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/magazine" element={<Magazine />} />
            <Route path="/magazine/article/:id" element={<ArticleView />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
