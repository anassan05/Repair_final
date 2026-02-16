import React from 'react';
import { HiComputerDesktop } from 'react-icons/hi2';
import { BsLaptop } from 'react-icons/bs';
import { MdLaptopMac } from 'react-icons/md';
import { FaLaptopCode } from 'react-icons/fa';
import { RiComputerLine } from 'react-icons/ri';

const IconTest: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Icon Test Component</h2>
      <p>Laptop Repair Icons Showcase:</p>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <BsLaptop 
            style={{ 
              fontSize: '120px', 
              color: '#3b82f6',
              marginBottom: '10px'
            }}
          />
          <p>Bootstrap Laptop</p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <MdLaptopMac 
            style={{ 
              fontSize: '120px', 
              color: '#10b981',
              marginBottom: '10px'
            }}
          />
          <p>MacBook Icon</p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <FaLaptopCode 
            style={{ 
              fontSize: '120px', 
              color: '#8b5cf6',
              marginBottom: '10px'
            }}
          />
          <p>Laptop with Code</p>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center' }}>
          <HiComputerDesktop 
            style={{ 
              fontSize: '120px', 
              color: '#f59e0b',
              marginBottom: '10px'
            }}
          />
          <p>Desktop Computer</p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <RiComputerLine 
            style={{ 
              fontSize: '120px', 
              color: '#ef4444',
              marginBottom: '10px'
            }}
          />
          <p>Computer Line</p>
        </div>
      </div>
      
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
        <h3>Icon Benefits:</h3>
        <ul>
          <li>✅ Scalable vector graphics - crisp at any size</li>
          <li>✅ Faster loading - no image downloads</li>
          <li>✅ Customizable colors and effects</li>
          <li>✅ Consistent with modern design systems</li>
          <li>✅ Better accessibility and screen reader support</li>
        </ul>
      </div>
    </div>
  );
};

export default IconTest;