import React from 'react';
import './Labs.css';

interface LabsProps {
  labData: any[];
}

const Labs: React.FC<LabsProps> = ({ labData }) => {
  return (
    <div className="labData-container">
      {labData.map((labData, index) => (
        <div key={index} className="labData-item">
          <p>{labData.title}</p>
          <p>{labData.virtualMachineProfile.createOption === 1 ? 'Customizable' : 'Non-customizable'}</p>
          <p>{labData.virtualMachineProfile.imageReference.offer}</p>
          {labData.virtualMachineProfile.createOption === 1 ? (
            <div className="templatelink">
              <a href={`https://labs.azure.com/subscriptions/${labData.labPlanId.subscriptionId}/resourceGroups/${labData.labPlanId.parent.resourceGroupName}/providers/microsoft.labservices/labs/${labData.title}/template`} target="_blank" rel="noopener noreferrer">
                customize
              </a>
            </div>
          ) : 
          <div className="templatelink">
              <a href={`https://labs.azure.com/subscriptions/${labData.labPlanId.subscriptionId}/resourceGroups/${labData.labPlanId.parent.resourceGroupName}/providers/microsoft.labservices/labs/${labData.title}/dashboard`} target="_blank" rel="noopener noreferrer">
                Dashboard
              </a>
            </div>
          }
        <div className="hidden-info">
          <p>{labData.labPlanId.parent.resourceGroupName}</p>
          <p>Lab Plan Id: {labData.labPlanId.subscriptionId}/{labData.labPlanId.name}</p>
          <p>SKU Name: {labData.virtualMachineProfile.sku.name}</p>
          <p>Usage Quota: {labData.virtualMachineProfile.usageQuota}</p>
        </div>
      </div>
      ))}
    </div>
  );
};

export default Labs;