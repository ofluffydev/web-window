import { useState } from "react";
import { Input } from "@/components/ui/input";

function UsernameChanger() {
  const [username, setUsername] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = () => {
    localStorage.setItem("username", username);
    alert(`Username changed to: ${username}`);
    setUsername(""); // Clear the input after submitting
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-neutral-700 rounded-lg shadow-md">
      <label htmlFor="username">Change username:</label>
      <Input
        id="username"
        name="username"
        value={username}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Change</button>
    </div>
  );
}

export default UsernameChanger;
