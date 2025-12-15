import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import SubmitFeedback from './pages/SubmitFeedback';
import ViewFeedback from './pages/ViewFeedback';

function App() {
  return (
    <Router>
      <div className="min-h-screen pt-24">
        <Navigation />
        <Routes>
          <Route path="/" element={<SubmitFeedback />} />
          <Route path="/view" element={<ViewFeedback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
