import React, { useState } from 'react';
import './App.css';

const generatePassword = (length, includeUpperCase, includeLowerCase, includeNumbers, includeSymbols) => {
  const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()-_=+[]{}|;:\'",.<>/?';

  let characters = '';
  if (includeUpperCase) characters += upperCaseChars;
  if (includeLowerCase) characters += lowerCaseChars;
  if (includeNumbers) characters += numberChars;
  if (includeSymbols) characters += symbolChars;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
};

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeUpperCase, setIncludeUpperCase] = useState(true);
  const [includeLowerCase, setIncludeLowerCase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const handleGeneratePassword = () => {
    const password = generatePassword(passwordLength, includeUpperCase, includeLowerCase, includeNumbers, includeSymbols);
    setGeneratedPassword(password);
  };

  const handleCopyToClipboard = () => {
    const textarea = document.createElement('textarea');
    textarea.value = generatedPassword;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  return (
    <div className="password-generator">
      <h1>Password Generator</h1>
      <label>
        Password Length:
        <input
          type="number"
          value={passwordLength}
          onChange={(e) => setPasswordLength(Math.max(1, parseInt(e.target.value, 10)))}
        />
      </label>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeUpperCase}
            onChange={() => setIncludeUpperCase(!includeUpperCase)}
          />
          Include Uppercase
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeLowerCase}
            onChange={() => setIncludeLowerCase(!includeLowerCase)}
          />
          Include Lowercase
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          Include Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          Include Symbols
        </label>
      </div>
      <button onClick={handleGeneratePassword}>Generate Password</button>
      <div>
        <h2>Generated Password:</h2>
        <pre>{generatedPassword}</pre>
        <button onClick={handleCopyToClipboard}>Copy to Clipboard</button>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <PasswordGenerator />
    </div>
  );
}

export default App;
