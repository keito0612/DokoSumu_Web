import { useState } from 'react';

export type Tab = {
  id: string;
  label: string;
  content: string;
  onTap:(tabId:string) => void;
};

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
  const ButtonOnClick = (tabId:string, tab:Tab) => {
    setActiveTab(tabId);
    tab.onTap(tabId);
  }

  return (
    <div>
      <div className="w-full flex border-b justify-center ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => ButtonOnClick(tab.id, tab)}
            className={`py-2 w-1/2 -mb-px mr-1 cursor-pointer  ${
              activeTab === tab.id
                ? 'border-b-2 border-green-500 text-green-500'
                : 'text-gray-500 hover:text-green-500'
            }`}
          >
           <p>{tab.label}</p> 
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;