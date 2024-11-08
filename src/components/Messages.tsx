import { useState, useEffect, useRef } from "react";

// Define the shape of a message object
interface Message {
  id: number;
  username: string;
  body: string;
}

// Define props for the component
interface MessagesProps {
  apiUrl?: string;
  className?: string;
}

export default function Messages({
  apiUrl = "https://room.kadenfrisk.com",
  className,
}: MessagesProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${apiUrl}/messages`);
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data: Message[] = await response.json();
        setMessages(data);
        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
        setIsLoading(false);
      }
    };

    fetchMessages();
    const intervalId = setInterval(fetchMessages, 500);

    return () => clearInterval(intervalId);
  }, [apiUrl]);

  if (isLoading) {
    return <div className="text-center p-4">Loading messages...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div
      className={`w-full px-1 mx-auto mt-8 h-96 overflow-y-auto ${className}`}
    >
      {messages.length === 0 ? (
        <p className="text-center text-gray-400">No messages found.</p>
      ) : (
        <ul className="space-y-2">
          {messages.map((message) => (
            <li key={message.id} className="bg-gray-800 p-4 rounded shadow">
              <p className="font-bold text-white">{message.username}</p>
              <p className="text-gray-300">{message.body}</p>
            </li>
          ))}
        </ul>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
