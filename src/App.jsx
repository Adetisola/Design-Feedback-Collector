import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import PostDesign from './pages/PostDesign';
import DesignList from './pages/DesignList';
import DesignDetail from './pages/DesignDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen pt-24">
        <Navigation />
        <Routes>
          {/* DesignList is parent route - stays mounted */}
          <Route path="/" element={<DesignList />}>
            {/* DesignDetail renders as overlay without unmounting DesignList */}
            <Route path="designs/:id" element={<DesignDetail />} />
          </Route>
          <Route path="/post-design" element={<PostDesign />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
