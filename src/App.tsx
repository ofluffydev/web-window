import Messages from "./components/Messages";
import MessageSender from "./components/MessageSender";
import UsernameChanger from "./components/UsernameChanger";

function App() {
  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 border-r border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-4">The Room</h1>
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
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-800 px-6 py-4 border-b border-gray-700">
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
