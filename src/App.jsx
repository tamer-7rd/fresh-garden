import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import { seoData } from './content/seoData';
import './index.css';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        {/* Global Structured Data */}
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(seoData.organization)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(seoData.localBusiness)}
          </script>
        </Helmet>

        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/haqqimizda" element={<AboutPage />} />
              <Route path="/mehsullarimiz" element={<ProductsPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;

