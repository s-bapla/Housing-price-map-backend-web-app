
import { Region } from "types";
import DeleteModal from "./DeleteModal";

interface prop {
    setCurrentRegion: React.Dispatch<React.SetStateAction<any>>;
    regions: Region[]
  }
  
  const RegionsSelector = ({ setCurrentRegion, regions }: prop) => {

    
    const onEdit = (region: Region) => {
      setCurrentRegion(region);
    };

    const onAddRegion = () => {
      setCurrentRegion({
        region_id: "-1",
        region_name: "Update Name",
        region_description: "",
        cities: [],
      });
    }
  
    const onRegionSelected = (region_id: string) => {
      console.log(region_id);
      const selected_region = regions.find(
        (region) => (region.region_id as number).toString()  === region_id
      );
      console.log(selected_region);
      setCurrentRegion(selected_region);
    };
  
    return (
      <div>
        <div className="">
          <div className="mt-8">
            <div className="flex flex-col items-center justify-center">
              <div className="text-center ">
                <div>
                  <h1 className="text-2xl font-bold mb-4">Regions</h1>
                  <div className="shadow bg-white px-16 py-8 rounded text-center my-4">
                    <table className="table-auto">
                      <thead>
                        <tr>
                          <th></th>
                          <th className="px-8 py-2">#</th>
                          <th className="px-8 py-2">Region Name</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {regions.map((region, index) => (
                          <tr key={region.region_id}>
                            <td>
                              <input
                                type="radio"
                                id="radio-button"
                                name="radio-group"
                                value={region.region_id}
                                onChange={(e) => onRegionSelected(e.target.value)}
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mr-4"
                              />{" "}
                            </td>
                            <td className="border px-6 py-2">{index + 1}</td>
                            <td className="border px-6 py-2">
                              {region.region_name}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
                    onClick={onAddRegion}
                    >
                      Add Region
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  export default RegionsSelector;