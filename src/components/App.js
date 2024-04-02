import React, { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [processedText, setProcessedText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/process_text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      if (!response.ok) {
        throw new Error('Failed to process text. Check browser console for details.');
      }
      const data = await response.json();
      setProcessedText(data.result); // Update to use 'result' instead of 'processed_text'
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div>
      <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Process Text</button>
      {processedText && <p>Processed Text: {processedText}</p>}
    </div>
  );
}

export default App;
