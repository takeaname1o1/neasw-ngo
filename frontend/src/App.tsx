import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Work } from './pages/Work';
import { Join } from './pages/Join';
import { Contact } from './pages/Contact';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'about':
        return <About setCurrentPage={setCurrentPage} />;
      case 'work':
        return <Work setCurrentPage={setCurrentPage} />;
      case 'join':
        return <Join />;
      case 'contact':
        return <Contact setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navigation Header */}
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>

      {/* Global Footer */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
