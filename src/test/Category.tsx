import React, { useState } from 'react';
import Popup from './Popup';

interface CategoryProps {
  categories: any[];
  simple_lpList: any[];
}

interface CategoryConfiguration {
  classname: string;
  specification: string;
  core: string;
  advanced: string;
}

const categoryConfigurations: Record<string, CategoryConfiguration> = {
    'Ubuntu Server 20.04 LTS': {
        classname: 'Ubuntu Server 20.04 LTS',
        specification: 'medium_nested',
        core: 'xxxxx',
        advanced: 'no',
    },
    'Windows 11 Pro, version 21H2 (Gen2)': {
        classname: 'Windows 11 Pro, version 21H2 (Gen2)',
        specification: 'medium_nested',
        core: 'yyyyyy',
        advanced: 'no',
    },
    'Visual Studio 2022 Community on Windows 11 Enterprise N (x64)': {
        classname: 'Visual Studio 2022 Community on Windows 11 Enterprise N (x64)',
        specification: 'medium_nested',
        core: 'sesese',
        advanced: 'no',
    },
    'Windows 11 Pro N, version 21H2 (Gen2)': {
        classname: 'Windows 11 Pro N, version 21H2 (Gen2)',
        specification: 'medium_nested',
        core: 'sqsqsq',
        advanced: 'no',
    },
    'Windows Server 2022 Datacenter (Gen2)': {
        classname: 'Windows Server 2022 Datacenter (Gen2)',
        specification: 'medium_nested',
        core: 'zzzzzz',
        advanced: 'no',
    },
    'CentOS-Based 8.4 (Gen2)': {
        classname: 'CentOS-Based 8.4 (Gen2)',
        specification: 'medium_nested',
        core: 'xsxsxsxs',
        advanced: 'noZ'
    },
};

const Category: React.FC<CategoryProps> = ({ categories, simple_lpList }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [config, setConfig] = useState<CategoryConfiguration | null>(null);

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
    const categoryConfig = categoryConfigurations[category.properties.displayName];
    setConfig(categoryConfig);
    setShowPopup(true);
  };
  

  if (categories && categories.length > 0) {
    return (
      <>
        <div className="category-container">
          {categories.map((category, index) => {
            const config = categoryConfigurations[category.properties.displayName];

            return (
              <div key={index} className="category-item" onClick={() => handleCategoryClick(category)}>
                <p>{category.properties.displayName}</p>
                
                  <p>{category.properties.author}</p>
                  <p>{category.properties.plan}</p>
                  <p>{category.properties.offer}</p>
                  <p>{category.properties.publisher}</p>
                  <p>{category.properties.sku}</p>
                  <p>{category.properties.version}</p>
                
                {config && (
                  <div className="category-configuration">
                    <p>Specification: {config.specification}</p>
                    <p>Core: {config.core}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {showPopup && selectedCategory && (
           <Popup
           category={selectedCategory}
           onClose={() => {
             setShowPopup(false);
             setSelectedCategory(null);
             setConfig(null);
           }}
           config={config}
           simple_lpList={simple_lpList}
         />
        )}
      </>
    );
  } else {
    return <p>No categories found.</p>;
  }
};

export default Category;