import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const parsedInput = JSON.parse(input);
            const res = await axios.post('bajaj-finserv-test-5pn3vvcf3-zaidkhan078s-projects.vercel.app/bfhl', parsedInput);
            setResponse(res.data);
            setError(null);
        } catch (err) {
            setError('Invalid JSON input or server error');
            setResponse(null);
        }
    };

    const handleSelect = (e) => {
        const { options } = e.target;
        const selected = Array.from(options).filter(option => option.selected).map(option => option.value);
        setSelectedOptions(selected);
    };

    return (
        <div className="App">
            <h1>{'Your Roll Number'}</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Enter JSON'
                />
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <select multiple={true} onChange={handleSelect}>
                        <option value="alphabets">Alphabets</option>
                        <option value="numbers">Numbers</option>
                        <option value="highest_alphabet">Highest Alphabet</option>
                    </select>
                    <div>
                        {selectedOptions.includes('alphabets') && <p>Alphabets: {response.alphabets.join(', ')}</p>}
                        {selectedOptions.includes('numbers') && <p>Numbers: {response.numbers.join(', ')}</p>}
                        {selectedOptions.includes('highest_alphabet') && <p>Highest Alphabet: {response.highest_alphabet.join(', ')}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
