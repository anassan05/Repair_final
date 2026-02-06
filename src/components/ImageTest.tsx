import React from 'react';
import laptopRepairImage from '../assets/lap1.jpg';

const ImageTest: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Image Test Component</h2>
      <p>Testing image import: {laptopRepairImage}</p>
      <img 
        src={laptopRepairImage} 
        alt="Test image" 
        style={{ maxWidth: '300px', height: 'auto' }}
        onLoad={() => console.log('Test image loaded successfully')}
        onError={(e) => console.error('Test image failed to load:', e)}
      />
      <br />
      <p>Also testing public path:</p>
      <img 
        src="/lap1.jpg" 
        alt="Public path test" 
        style={{ maxWidth: '300px', height: 'auto' }}
        onLoad={() => console.log('Public path image loaded successfully')}
        onError={(e) => console.error('Public path image failed to load:', e)}
      />
    </div>
  );
};

export default ImageTest;