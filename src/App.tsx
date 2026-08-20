import React from 'react';
import { CSATProvider, useCSAT } from './context/CSATContext';
import { Navbar } from './components/Navbar';
import { ContentEditor } from './components/content/ContentEditor';
import { StylingEditor } from './components/styling/StylingEditor';
import { MobilePreview } from './components/preview/MobilePreview';

const MainLayout: React.FC = () => {
  const { activeTab } = useCSAT();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
      <Navbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          {activeTab === 'content' ? <ContentEditor /> : <StylingEditor />}
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-20">
          <MobilePreview />
        </div>
      </main>
    </div>
  );
};

export function App() {
  return (
    <CSATProvider>
      <MainLayout />
    </CSATProvider>
  );
}

export default App;
