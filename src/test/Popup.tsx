import React, { useState, useEffect } from 'react';
import './Popup.css'

interface PopupProps {
  category: any;
  onClose: () => void;
  config: {
    specification: string;
    core: string;
  } | null;
  simple_lpList: any[];
}

const Popup: React.FC<PopupProps> = ({ category, onClose, config, simple_lpList }) => {
    const [labtitleInput, setlabtitleInput] = useState('');
    const [loginInput, setloginInput] = useState('');
    const [passwordInput, setpasswordInput] = useState('');
    const [numberInput, setnumberInput] = useState('');
  
    const labtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setlabtitleInput(e.target.value);
    };
    const loginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setloginInput(e.target.value);
    };
    const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setpasswordInput(e.target.value);
    };
    const numberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setnumberInput(e.target.value);
      };
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{category.properties.displayName}</h2>
        <p>Author: {category.properties.author}</p>
        <p>Plan: {category.properties.plan}</p>
        <p>Offer: {category.properties.offer}</p>
        <p>Publisher: {category.properties.publisher}</p>
        <p>SKU: {category.properties.sku}</p>
        <p>Version: {category.properties.version}</p>
        {config && (
          <div className="category-configuration">
            <p>Specification1: {config.specification}</p>
            <p>Core1 {config.core}</p>
          </div>
        )}
        <div className="dropdown">
        <select defaultValue="">
          <option value="" disabled>
            Please select
          </option>
          {simple_lpList.map((labplan, index) => (
            <option key={index} value={labplan.id}>
              {labplan.id}
            </option>
          ))}
        </select>
      </div>
        <p>Lab Title: {labtitleInput} <input type="text" value={labtitleInput} onChange={labtitleChange} /></p>
        <p>login: {loginInput} <input type="text" value={loginInput} onChange={loginChange} /></p>
        <p>password: {passwordInput} <input type="text" value={passwordInput} onChange={passwordChange} /></p>
        <p>number of student: {numberInput} <input type="text" value={numberInput} onChange={numberChange} /></p>
        
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div></div>
          
          <button>Next</button>
        </div>
        
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;