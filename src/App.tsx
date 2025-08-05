// File: src/App.tsx
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

type Mode = 'comment' | 'explanation' | 'both';

function App() {
  const [code, setCode] = useState('');
  const [mode, setMode] = useState<Mode>('both');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExplain = async () => {
    if (!code.trim()) {
      setError('Please enter some code to explain!');
      return;
    }
    setError('');
    setLoading(true);
    setResult('');
    try {
      const response = await axios.post('http://localhost:5000/api/explain', {
        code,
        mode,
        language: 'typescript',
      });
      setResult(response.data.explainedCode || response.data.explanation || 'No result returned.');
    } catch (err) {
      setError('Oops! Something went wrong while explaining the code.');
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">DocuGene</div>
        <nav className="nav">
          <div className="dropdown">
            <button className="dropbtn">Tools ▾</button>
            <div className="dropdown-content">
              <a href="#">Code Generator</a>
              <a href="#">Code Explainer</a>
              <a href="#">Code Converter</a>
            </div>
          </div>
          <a href="#">Pricing</a>
          <a href="#">Contact</a>
          <a href="#">Login</a>
        </nav>
      </header>

      <main className="main-content">
        <h1 className="app-title">AI Code Explainer & Commenter</h1>

        <div className="input-section">
          <label htmlFor="code-input" className="section-label">Paste your TypeScript / React code:</label>
          <textarea
            id="code-input"
            className="code-input"
            placeholder="Enter your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
        </div>

        <div className="controls">
          <label htmlFor="mode-select" className="mode-label">Select Mode:</label>
          <select
            id="mode-select"
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            className="mode-select"
          >
            <option value="comment">Comment Only</option>
            <option value="explanation">Explanation Only</option>
            <option value="both">Both</option>
          </select>

          <button className="explain-btn" onClick={handleExplain} disabled={loading}>
            {loading ? 'Explaining...' : 'Explain Code'}
          </button>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <div className="output-section">
          <label htmlFor="output" className="section-label">Result:</label>
          <pre id="output" className="output-box">{loading ? 'Loading...' : result || 'Your explained code will appear here.'}</pre>
        </div>
      </main>

      <footer className="footer">
  <div className="footer-content">
    <p>© 2025 <strong>DocuGen</strong>. All rights reserved.</p>
    <div className="footer-links">
      <a href="#">Privacy</a>
      <a href="#">Terms</a>
      <a href="#">Support</a>
    </div>
  </div>
</footer>

    </div>
  );
}

export default App;