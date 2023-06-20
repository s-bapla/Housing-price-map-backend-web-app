// pages/StatesPage.tsx
import Header from "@/components/Header";
import SideNav from "@/components/SidNav";
import { State } from "types";
import statesService from "@/services/states-service";
import { useState } from "react";
import CreateStateForm from "@/components/CreateStateForm";

export async function getServerSideProps() {
  try {
    const states = await statesService.getStates();
    return { props: { states } };
  } catch (err) {
    const states = [] as State[];
    return { props: { states } };
  }
}

interface StatesPageProps {
  states: State[];
}

const useStates = (initialStates: State[]) => {
    const [states, setStates] = useState<State[]>(initialStates);
  
    const deleteState = async (stateId: number) => {
      try {
        await statesService.deleteState(stateId);
        setStates(states.filter((state) => state.state_id !== stateId));
      } catch (error) {
        console.error("Error deleting state:", error);
        // Display error message to user
      }
    };
  
    const createState = async (newState: State) => {
        try {
          const createdState = await statesService.createState(newState);
          console.log('Created state:', createdState); // Debugging
          setStates([...states, createdState]);
        } catch (error) {
          console.error("Error creating state:", error);
          // Display error message to user
        }
      };
  
    return { states, deleteState, createState };
  };

  const StatesPage = ({ states: initialStates }: StatesPageProps) => {
    const { states, deleteState, createState } = useStates(initialStates);
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  
    return (
      <div className="bg-gray-50 h-screen">
        <Header />
        <div className="flex flex-row h-screen">
          <SideNav />
          <div className="flex flex-row justify-center w-full bg-gray-50">
            <StatesTable
              states={states}
              onDeleteState={deleteState}
              onCreateState={createState}
              showCreateForm={showCreateForm}
              setShowCreateForm={setShowCreateForm}
            />
          </div>
        </div>
      </div>
    );
  };

  interface StatesTableProps {
    states: State[];
    onDeleteState: (stateId: number) => void;
    onCreateState: (newState: State) => void;
    showCreateForm: boolean;
    setShowCreateForm: (show: boolean) => void;
  }
      
  const StatesTable = ({
    states,
    onDeleteState,
    onCreateState,
    showCreateForm,
    setShowCreateForm,
  }: StatesTableProps) => {

    return (
        <div className="w-full h-screen">
          <div className="container mx-auto py-12">
            <div className="flex flex-col items-center justify-center">
              <div className="text-center max-w-screen-lg">
                <div>
                  <h1 className="text-3xl font-bold mb-8">States</h1>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                    onClick={() => setShowCreateForm(!showCreateForm)}
                  >
                    {showCreateForm ? "Cancel" : "Add New State"}
                  </button>
                  {showCreateForm && <CreateStateForm onCreateState={onCreateState} />}
                  <div className="shadow bg-white px-8 py-8 rounded text-center mt-4">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-lg font-bold">#</th>
                      <th className="px-4 py-2 text-lg font-bold">State Name</th>
                      <th className="px-4 py-2 text-lg font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {states.map((state) => (
                      <StateRow key={state.state_id} state={state} onDeleteState={onDeleteState} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StateRowProps {
    state: State;
    onDeleteState: (stateId: number) => void;
  }
  
  const StateRow = ({ state, onDeleteState }: StateRowProps) => {
    const handleDelete = () => {
      onDeleteState(state.state_id as number);
    };
  
    return (
      <tr className="bg-gray-50">
        <td className="border px-4 py-2 text-lg">{state.state_id}</td>
        <td className="border px-4 py-2 text-lg">{state.name}</td>
        <td className="border px-4 py-2">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };

export default StatesPage;
