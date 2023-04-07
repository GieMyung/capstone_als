import React, { useState, useEffect } from 'react';
import './App.css';
import Category from './Category';
import Labs from './test/Labs';



interface ApiResponse {
  simple_lp: any[];
  advanced_lp: any[];
  labDatas: any[];
  imageCollection: any[];
}

function App() {
  const [responseMessage, setResponseMessage] = useState<ApiResponse>();
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://labsauto20230330224718.azurewebsites.net/api/HttpExample');
        const data = await response.json();
        setResponseMessage(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const simplelp = responseMessage?.simple_lp?.map((item, index) => {
    return {
      name: item.data.id.name,
      subscriptionId: item.data.id.parent.parent.name,
      resourceGroupName: item.data.id.parent.name,
      allowedregion: item.data.allowedRegions,
      defaultAutoShutdownProfile: item.data.defaultAutoShutdownProfile !== null ? {
        shutdownOnDisconnect: item.data.defaultAutoShutdownProfile.shutdownOnDisconnect,
        shutdownWhenNotConnected: item.data.defaultAutoShutdownProfile.shutdownWhenNotConnected,
        shutdownOnIdle: item.data.defaultAutoShutdownProfile.shutdownOnIdle,
        disconnectDelay: item.data.defaultAutoShutdownProfile.disconnectDelay,
        noConnectDelay: item.data.defaultAutoShutdownProfile.noConnectDelay,
        idleDelay: item.data.defaultAutoShutdownProfile.idleDelay,
      } : null
    };
  }) ?? [];
  const advancedlp = responseMessage?.advanced_lp.map((item, index) => {
    return {
      name: item.data.id.name,
      subscriptionId: item.data.id.parent.name,
      resourceGroupName: item.data.id.parent.parent.name,
      subnetName: item.data.defaultNetworkSubnetId.name,
      defaultAutoShutdownProfile: item.data.defaultAutoShutdownProfile !== null ? {
        shutdownOnDisconnect: item.data.defaultAutoShutdownProfile.shutdownOnDisconnect,
        shutdownWhenNotConnected: item.data.defaultAutoShutdownProfile.shutdownWhenNotConnected,
        shutdownOnIdle: item.data.defaultAutoShutdownProfile.shutdownOnIdle,
        disconnectDelay: item.data.defaultAutoShutdownProfile.disconnectDelay,
        noConnectDelay: item.data.defaultAutoShutdownProfile.noConnectDelay,
        idleDelay: item.data.defaultAutoShutdownProfile.idleDelay,
      } : null
    }; 
  }) ?? [];

  
  
  return (
    
    <div>
      {isLoading ? (
        <div className='loading'>
          <p>Welcome to Labs Library Web App for ALS.</p>
          <p> ssLoading please wait </p></div>
      ) : (
        responseMessage && (
          <>
            <Labs labData={responseMessage.labDatas} />
            <Category categories={responseMessage.imageCollection} simplelp={simplelp} />
          </>
        )
      )}
    </div>
    
  );
}
  

export default App;

