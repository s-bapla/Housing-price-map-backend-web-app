import { ZillowEstimate } from "types";
import ZillowEstimateRow from "./ZillowEstimateRow";
import ZillowEstimateForm from "./ZillowEstimateForm";
import { useState } from "react";
import { House } from "types";

interface ZillowEstimatesProps {
  zillowEstimates: ZillowEstimate[];
  houses: House[];
  onCreate: (zillowEstimate: ZillowEstimate) => void;
  onUpdate: (zillowEstimate: ZillowEstimate) => void;
  onDelete: (zillow_price_id: number) => void;
}

const ZillowEstimates = ({
  zillowEstimates,
  houses,
  onCreate,
  onUpdate,
  onDelete,
}: ZillowEstimatesProps) => {

    const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className="w-full p-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setIsFormVisible(true)}
      >
        Create New
      </button>
      {zillowEstimates.length > 0 ? (
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Zestimate</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Home ID</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {zillowEstimates.map((zillowEstimate) => (
              <ZillowEstimateRow
                key={zillowEstimate.zillow_price_id}
                zillowEstimate={zillowEstimate}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mt-4" role="alert">
          <p className="font-bold">No Zillow Estimates</p>
          <p className="text-sm">No Zillow estimates exist right now. Please add one using the form above.</p>
        </div>
      )}
    {isFormVisible && <ZillowEstimateForm onSubmit={onCreate}  houses={houses}  />}
    </div>
  );
};

export default ZillowEstimates;
