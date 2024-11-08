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
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageCountRef = useRef(0);

  const isNearBottom = () => {
    const container = messagesContainerRef.current;
    if (!container) return false;
    
    const threshold = 100; // pixels from bottom
    return (
      container.scrollHeight - container.scrollTop - container.clientHeight <= threshold
    );
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current && shouldScrollToBottom) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  // Handle scroll events to determine if we should auto-scroll
  const handleScroll = () => {
    setShouldScrollToBottom(isNearBottom());
  };

  // Effect to handle new messages and scrolling
  useEffect(() => {
    if (messages.length > lastMessageCountRef.current) {
      // If we were near bottom or this is a new message, scroll down
      if (shouldScrollToBottom) {
        scrollToBottom();
      }
      lastMessageCountRef.current = messages.length;
    }
  }, [messages, shouldScrollToBottom]);

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
      ref={messagesContainerRef}
      onScroll={handleScroll}
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
    </div>
  );
}