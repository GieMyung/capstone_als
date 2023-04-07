import React, { useState, useEffect } from 'react';
import './Popup.css'

interface PopupProps {
  category: any;
  onClose: () => void;
  config: {
    specification: string;
    core: string;
    advanced: string;
  } | null;
  simplelp: any[];
}

const Popup: React.FC<PopupProps> = ({ category, onClose, config, simplelp}) => {
    const [labtitleInput, setlabtitleInput] = useState('');
    const [loginInput, setloginInput] = useState('');
    const [passwordInput, setpasswordInput] = useState('');
    const [numberInput, setnumberInput] = useState('');
    const [simplelpchoice, setsimplelpchangeInput] = useState('');
    const [allowedRegion, setAllowedRegion] = useState('');
    const [createResourceGroup, setCreateResourceGroup] = useState('');
    const [createLabPlan, setCreateLabPlan] = useState('');
  
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
    const simplelpChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setsimplelpchangeInput(e.target.value);
    };
    const allowedRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setAllowedRegion(e.target.value);
    };
    const createResourceGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCreateResourceGroup(e.target.value);
    };
    const createLabPlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCreateLabPlan(e.target.value);
    };

    const handleNextClick = async () => {
      // Prepare the data to be sent to the backend
      const selectedLp = simplelp[parseInt(simplelpchoice)];
      const data = {
        Title: labtitleInput,
        username: loginInput,
        password: passwordInput,
        number: numberInput,
        subscriptionId: selectedLp.subscriptionId,
        resourceGroupName: selectedLp.resourceGroupName,
        labplan: selectedLp.name,
        region: allowedRegion,
        defaultAutoShutdownProfile: selectedLp.defaultAutoShutdownProfile !== null ? {
          shutdownOnDisconnect: selectedLp.defaultAutoShutdownProfile.shutdownOnDisconnect,
          shutdownWhenNotConnected: selectedLp.defaultAutoShutdownProfile.shutdownWhenNotConnected,
          shutdownOnIdle: selectedLp.defaultAutoShutdownProfile.shutdownOnIdle,
          disconnectDelay: selectedLp.defaultAutoShutdownProfile.disconnectDelay,
          noConnectDelay: selectedLp.defaultAutoShutdownProfile.noConnectDelay,
          idleDelay: selectedLp.defaultAutoShutdownProfile.idleDelay,
        } : null,
        author: category.properties.author,
        offer: category.properties.offer,
        publisher: category.properties.publisher,
        sku: category.properties.sku,
        version: category.properties.version,
        createResourceGroup: createResourceGroup,
        createLabPlan: createLabPlan,
      };
      try {
        const response = await fetch('https://labsauto20230330224718.azurewebsites.net/api/labCreate?name=Functions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
          
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    
        const responseData = await response.json();
        console.log('API response:', responseData);
        
      } catch (error) {
        console.error('Error sending data to the API:', error);
        
      }
      
    };

    const resetInputsAndClose = () => {
      setlabtitleInput('');
      setloginInput('');
      setpasswordInput('');
      setnumberInput('');
      setsimplelpchangeInput('');
      setAllowedRegion('');
      onClose();
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
            <p>Specification: {config.specification}</p>
            <p>Core: {config.core}</p>
          </div>
        )}

        <p>Lab Plan: <select id="simplelp" value={simplelpchoice} onChange={simplelpChange}>
          <option value="" disabled selected>Please choose</option>
          {simplelp.map((lp, index) => (
            <option key={index} value={index}>
              {lp.name}
            </option>
            ))}
          </select>
        </p>
        {simplelpchoice && (
          <p>
            Allowed Region:{" "}
            <select
              id="allowedRegion"
              value={allowedRegion}
              onChange={allowedRegionChange}
            >
              <option value="" disabled selected>
                Please choose
              </option>
              {simplelp[parseInt(simplelpchoice)].allowedregion.map((regionObj: {name: string, displayName: string}, index: number) => (
                <option key={index} value={regionObj.name}>
                  {regionObj.displayName}
                </option>
              ))}
            </select>
          </p>
        )}
        




        <p>Lab Title:  <input type="text" value={labtitleInput} onChange={labtitleChange} /></p>
        <p>login:  <input type="text" value={loginInput} onChange={loginChange} /></p>
        <p>password:  <input type="text" value={passwordInput} onChange={passwordChange} /></p>
        <p>number of student:  <input type="text" value={numberInput} onChange={numberChange} /></p>
        

        <p>new RG:  <input type="text" value={createResourceGroup} onChange={createResourceGroupChange} /></p>
        <p>new LP:  <input type="text" value={createLabPlan} onChange={createLabPlanChange} /></p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div></div>
          
          <button onClick={handleNextClick}>Next</button>
        </div>
        
        <button onClick={resetInputsAndClose}>Close</button>
      </div>
    </div>
    
    );
  };

export default Popup;

