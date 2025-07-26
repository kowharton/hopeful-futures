import { useState } from 'react';
import './App.css';

function App() {
  const [fear, setFear] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  const generateStory = async () => {
    setLoading(true);
    setStory('');

    const prompt = `
    You are a speculative fiction writer helping people feel hopeful about the future.

    Someone has shared this fear about the climate crisis:
    "${fear}"

    Write a 200-word short story that transforms this fear into a beautiful, imaginative, and hopeful vision of the future. Be poetic, emotional, and end with a sense of possibility or peace. 
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9,
      }),
    });

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;
    setStory(result);
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
