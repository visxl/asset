import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      {/* <h1>Dynamic QR Code Generator</h1> */}
      <input type="text" value={inputValue} onChange={handleChange} placeholder="Enter text" />
      {inputValue && <QRCode value={inputValue} />}
    </div>
  );
};

export default QRCodeGenerator;