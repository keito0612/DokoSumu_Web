import { useState } from 'react';

export type Tab = {
  id: string;
  label: string;
  content: string;
  onTap: (tabId: string) => void;
};

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
  const ButtonOnClick = (tabId: string, tab: Tab) => {
    setActiveTab(tabId);
    tab.onTap(tabId);
  }

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-200 justify-center bg-white">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => ButtonOnClick(tab.id, tab)}
              className={`relative py-3 px-6 w-1/2 font-medium text-sm transition-colors duration-200 ${
                isActive
                  ? 'text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-green-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;