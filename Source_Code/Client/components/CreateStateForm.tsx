import { useState } from "react";
import { State } from "types";

interface CreateStateFormProps {
    onCreateState: (newState: State) => void;
  }
  
  const CreateStateForm = ({ onCreateState }: CreateStateFormProps) => {
    const [stateName, setStateName] = useState<string>("");
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (stateName.trim() === "") {
        // Display error message to user
        console.error("State name cannot be empty.");
        return;
      }
      onCreateState({ state_id: 0, name: stateName.trim() });
      setStateName("");
    };
  
    return (
      <form onSubmit={handleSubmit} className="w-full mt-4">
        <label htmlFor="stateName" className="block text-lg font-bold mb-2">
          State Name
        </label>
        <input
          type="text"
          id="stateName"
          name="stateName"
          value={stateName}
          onChange={(e) => setStateName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter state name"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Create State
        </button>
      </form>
    );
  };

  export default CreateStateForm