import { ZillowEstimate } from "types";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

interface ZillowEstimateRowProps {
  zillowEstimate: ZillowEstimate;
  onDelete: (zillow_price_id: number) => void;
  onUpdate: (zillowEstimate: ZillowEstimate) => void;
}

const ZillowEstimateRow = ({ zillowEstimate, onDelete, onUpdate }: ZillowEstimateRowProps) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div className="flex items-center">
          <span className="font-medium">${zillowEstimate.zestimate.toFixed(2)}</span>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <div className="flex items-center">
          <span>{zillowEstimate.date}</span>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <div className="flex items-center">
          <span>{zillowEstimate.home_id}</span>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center">
          <button
            className="w-6 h-6 text-yellow-500 transition-colors duration-150 hover:text-yellow-600"
            onClick={() => onUpdate(zillowEstimate)}
          >
            <AiOutlineEdit />
          </button>
          <button
            className="w-6 h-6 text-red-500 ml-4 transition-colors duration-150 hover:text-red-600"
            onClick={() => onDelete(zillowEstimate.zillow_price_id as number)}
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ZillowEstimateRow;
