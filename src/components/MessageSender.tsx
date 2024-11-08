import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const API_URL = "https://room.kadenfrisk.com";

const MessageSender = () => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!message.trim() || isSending) return;

    setIsSending(true);
    try {
      const response = await fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: localStorage.getItem("username") || "anonymous",
          body: message,
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setMessage("");
      toast({
        description: "Message sent successfully",
        variant: "default",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);

      // Update messages after sending a new message
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 p-4 rounded-lg border bg-background border-slate-800 shadow-md bg-neutral-800 items-start sm:items-center"
    >
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        className="min-h-[80px] sm:min-h-[60px] resize-none flex-1 bg-background text-white bg-neutral-900 border-slate-800 placeholder:text-slate-400"
      />
      <Button
        type="submit"
        className="self-end"
        disabled={!message.trim() || isSending}
      >
        <Send className="mr-2 h-4 w-4" />
        {isSending ? "Sending..." : "Send"}
      </Button>
    </form>
  );
};

export default MessageSender;
