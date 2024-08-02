import React, {useState} from 'react';

import axios from 'axios';
import Select from 'react-select';


const App = () =>{
  const [input,setInput] = useState('');
  const [response,setResponse]  = useState(null);
  const [error,setError] = useState('');
  const [visibility,setVisibility] = useState({
    alphabets: true,
    numbers: true,
    highestAlphabet: true,
  });

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highestAlphabet', label: 'Highest Alphabet' },    
  ];

  const handleInputChange = (e)=>{
    setInput(e.target.value);
    setError('');
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setError('');

    try{
      const jsonData = JSON.parse(input);
      const result = await axios.post('https://bfhl-frontend-roan.vercel.app/', jsonData);
      setResponse(result.data);
    }catch(err){
      setError('Invalid JSON input.');
    }
  };

  const handleVisibilityChange = (selectedOptions) => {
    const updatedVisibility = {
        alphabets: false,
        numbers: false,
        highestAlphabet: false,
    };
    selectedOptions.forEach(option => {
        updatedVisibility[option.value] = true;
    });
    setVisibility(updatedVisibility);
};

return(
  <div className="App">

            <h1>API Input</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder='Enter JSON here, e.g., {"data": ["A", "C", "z"]}'
                    rows="2"
                    cols="50"
                />
                <div>
                <button class="my-button" type="submit">Submit</button>
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </form>
            {response && (
             <div>
                  <Select
                        isMulti
                        options={options}
                        onChange={handleVisibilityChange}
                        placeholder="Select sections to display"
                    />

                  {visibility.alphabets && response.alphabets.length > 0 && (
                        <div>
                            <h2>Alphabets:</h2>
                            <p>{response.alphabets.join(', ')}</p>
                        </div>
                    )} 
                    {visibility.numbers && response.numbers.length > 0 && (
                        <div>
                            <h2>Numbers:</h2>
                            <p>{response.numbers.join(', ')}</p>
                        </div>
                    )}
                    {visibility.highestAlphabet && response.highest_alphabet.length > 0 && (
                        <div>
                            <h2>Highest Alphabet:</h2>
                            <p>{response.highest_alphabet.join(', ')}</p>
                        </div>
                    )}
                                       
                  

            </div>
            )}
        </div>
    );
};

export default App;




