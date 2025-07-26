import { useState } from 'react';
import './App.css';

function App() {
  const [fear, setFear] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  const generateStory = async () => {
    setLoading(true);
    setStory('');

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fear }),
    });

    const data = await response.json();
    setStory(data.story);
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>🌱 Hopeful Futures</h1>
      <textarea
        placeholder="What’s your deepest climate fear?"
        value={fear}
        onChange={(e) => setFear(e.target.value)}
      />
      <button onClick={generateStory} disabled={loading || !fear}>
        {loading ? "Generating..." : "Generate Vision"}
      </button>

      {story && (
        <div className="result">
          <h2>Your Future Story</h2>
          <p>{story}</p>
        </div>
      )}
    </div>
  );
}

export default App;
