import { useEffect, useState } from "react";
import { City, Region } from "types";
import AddCitytoRegion from "./AddCitytoRegion";
import { XMarkIcon } from "@heroicons/react/24/solid";
import citiesService from "@/services/cities-service";
import regionsService from "@/services/regions-service";

interface prop {
  currentRegion: Region;
  all_cities: City[];
}

const RegionDetails = ({ currentRegion, all_cities }: prop) => {
  const [region_description, setRegionDescription] = useState<string>("");
  const [region_name, setRegionName] = useState<string>("");
  const [cities, setCities] = useState<string[]>([]);
  const [showAddCity, setShowAddCity] = useState<boolean>(false);

  useEffect(() => {
    if(currentRegion){
      setRegionName(currentRegion.region_name);
      setRegionDescription(currentRegion.region_description);
      setCities(currentRegion.cities);
    }

  }, [currentRegion]);

  const removeCity = (city_name: string) => {
    console.log("inside remove city");

    const updated_cities = cities.filter((city: string) => city !== city_name);
    setCities(updated_cities);
  };

  const addcity = () => {
    setShowAddCity(true);
  };

  const onAddCity = (city_name: string) => {
    setShowAddCity(false);
    setCities([...cities, city_name]);
  };

  const updateRegion = async () => {
    console.log("inside update region");
    try {
      const updated_region = {
        region_id: currentRegion.region_id,
        region_name,
        region_description,
        cities,
      };
      console.log(updated_region);
      if(updated_region.region_id == -1)
      {
        const response = await regionsService.createRegion(updated_region);
      }
      else{
      const response = await regionsService.updateRegion(updated_region);
      }
      // now reload the window
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteRegion = async () => {
    console.log("inside delete region");
    try {
      const response = await regionsService.deleteRegion(currentRegion.region_id as number);
      // now reload the window
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };


  const insertCities = (cities: string[]) => {
    return cities.map((city: string) => (
      <div className="flex " key={city}>
        <div className="px-4 py-2 border grow mr-2">{city}</div>
        <button onClick={() => removeCity(city)} className="active:scale-75">
          <XMarkIcon className="w-6 h-6 cursor-pointer" />{" "}
        </button>
      </div>
    ));
  };

  return (
    <>
      <div className="flex flex-col w-3/4 bg-white px-8 py-8 shadow">
        <input className="text-xl font-bold mb-4" value={region_name}  onChange={(e) => setRegionName(e.target.value)} />
        <textarea
          className="
          rounded-lg outline outline-offset-2 outline-1 outline-slate-500 focus:outline-blue-500
                text-start
                h-36"
          onChange={(e) => setRegionDescription(e.target.value)}
          value={region_description}
        />
        <label className="mt-4 text-lg font-bold">Cities</label>
        <div className="grid grid-cols-5 gap-x-4 gap-y-4 mt-4 text-center">
          {insertCities(cities)}

          <button
            className="px-4 py-2 bg-gray-200 text-slate-700 rounded hover:text-black hover:bg-gray-400 active:scale-95 "
            onClick={addcity}
          >
            Add City
          </button>
        </div>

        <div className="flex flex-row justify-end mt-4">
          <button
            type="button"
            className="mr-4 hover:underline hover:underline-offset-1 text-slate-700 hover:text-black active:scale-95"
            onClick={onDeleteRegion}
          >
            Delete
          </button>
          <button
            className=" bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 active:scale-95"
            onClick={updateRegion}
          >
            Save
          </button>
        </div>
      </div>
      {showAddCity && (
        <AddCitytoRegion
          setShowAddCity={setShowAddCity}
          cities={cities}
          all_cities={all_cities}
          onAddCity={onAddCity}
        />
      )}
    </>
  );
};

export default RegionDetails;
