import { useState } from 'react';
import Messages from "./components/Messages";
import MessageSender from "./components/MessageSender";
import UsernameChanger from "./components/UsernameChanger";
import { Menu, X } from 'lucide-react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-900 flex flex-col md:flex-row">
      {/* Mobile Header - Shows only on small screens */}
      <div className="md:hidden bg-gray-800 p-4 flex items-center justify-between border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">The Room</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white p-2"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar - Collapsible on mobile */}
      <div className={`
        ${isSidebarOpen ? 'block' : 'hidden'}
        md:block
        w-full md:w-64
        bg-gray-800 
        p-6 
        border-b md:border-r 
        border-gray-700
        md:h-screen
      `}>
        <h1 className="hidden md:block text-3xl font-bold text-white mb-4">The Room</h1>
        <div className="text-gray-300 space-y-4">
          <p className="text-sm">
            You are currently viewing "The Room" using "The Web Window" client.
          </p>
          <div className="pt-4">
            <UsernameChanger />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] md:h-screen">
        <header className="bg-gray-800 px-6 py-4 border-b border-gray-700 hidden md:block">
          <h2 className="text-xl font-semibold text-white">Messages</h2>
        </header>

        <Messages className="flex-1 overflow-y-auto px-6 py-4" />

        <div className="border-t border-gray-700 p-4">
          <MessageSender />
        </div>
      </div>
    </div>
  );
}

export default App;