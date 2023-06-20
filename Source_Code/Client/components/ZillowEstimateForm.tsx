import { useState, useEffect } from "react";
import { ZillowEstimate, House } from "types";


interface ZillowEstimateFormProps {
  onSubmit: (zillowEstimate: ZillowEstimate) => void;
  zillowEstimateToEdit?: ZillowEstimate;
  houses: House[];
}

const ZillowEstimateForm = ({
  onSubmit,
  zillowEstimateToEdit,
  houses,
}: ZillowEstimateFormProps) => {
  const [zestimate, setZestimate] = useState<number | undefined>(undefined);
  const [date, setDate] = useState<string | undefined>(undefined);
  const [home_id, setHomeId] = useState<number | undefined>( undefined);

  useEffect(() => {
    if (zillowEstimateToEdit) {
      setZestimate(zillowEstimateToEdit.zestimate);
      setDate(zillowEstimateToEdit.date);
      setHomeId(zillowEstimateToEdit.home_id);
    } 
  }, [zillowEstimateToEdit]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!zestimate || !date || !home_id) return;

    onSubmit({ zestimate, date, home_id });
    setZestimate(undefined);
    setDate(undefined);
    setHomeId(undefined);
  };
  

  return (
    <div className="fixed inset-0 bg-black opacity-50 z-10">
      <div className="flex justify-center items-center h-screen">
        <form className="bg-white p-8 rounded-lg w-1/3" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Zestimate</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              value={zestimate}
              onChange={(e) => setZestimate(e.target.valueAsNumber)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Home ID</label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={home_id}
              onChange={(e) => setHomeId(parseInt(e.target.value))}
            >
              <option value="">Select a house</option>
              {houses.map((house) => (
                <option key={house.home_id} value={house.home_id}>
                  {house.home_id}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {zillowEstimateToEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ZillowEstimateForm;