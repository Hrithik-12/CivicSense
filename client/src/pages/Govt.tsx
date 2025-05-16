import React, { useState } from 'react';
import IrrigationComparision from '@/components/DataFromapicompo/IrrigationComparision';
import TaxRevenueChart from '@/components/DataFromapicompo/TaxRevenue';
import DefenceBudgetChart from '@/components/DataFromapicompo/DefenceBudget';
import AirQualityViewer from '@/components/DataFromapicompo/AirQuality';
import MandiPriceViewer from '@/components/DataFromapicompo/MandiPrice';

const Govt = () => {
  const [activeTab, setActiveTab] = useState('agriculture');

  const tabs = [
    { id: 'agriculture', label: 'Agriculture', icon: '🌾' },
    { id: 'tax', label: 'Tax', icon: '💰' },
    { id: 'defence', label: 'Defence', icon: '🛡️' },
    { id: 'Air Quality', label: 'Air Quality', icon: '📚' },
    { id: 'MandiPrice', label: 'Mandi Price', icon: '🏥' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'agriculture':
        return (
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Irrigation Data Analysis</h2>
              <p className="text-sm text-gray-600 mt-1">Comparison of traditional vs drip irrigation methods</p>
            </div>
            <div className="p-6">
              <IrrigationComparision />
            </div>
          </section>
        );
      case 'tax':
        return (
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Financial Indicators</h2>
              <p className="text-sm text-gray-600 mt-1">Key financial metrics and economic trends</p>
            </div>
            <div className="p-6">
              {/* Add your finance component here */}
              <TaxRevenueChart/>
            </div>
          </section>
        );
      case 'defence':
        return (
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Defence Statistics</h2>
              <p className="text-sm text-gray-600 mt-1">Defence budget and strategic information</p>
            </div>
            <div className="p-6">
              {/* Add your defence component here */}
              <DefenceBudgetChart/>
            </div>
          </section>
        );
      case 'Air Quality':
        return (
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Air Pollutants </h2>
              <p className="text-sm text-gray-600 mt-1">Air Quality statistics and performance indicators</p>
            </div>
            <div className="p-6">
              {/* Add your education component here */}
              <AirQualityViewer/>
            </div>
          </section>
        );
      case 'MandiPrice':
        return (
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Mandi Price State Wise</h2>
              <p className="text-sm text-gray-600 mt-1">All States with Real Time Price </p>
            </div>
            <div className="p-6">
              {/* Add your healthcare component here */}
             <MandiPriceViewer/>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Government Data</h1>
        
        {/* Tabs Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 gap-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Govt; 