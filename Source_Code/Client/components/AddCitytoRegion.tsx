import { useEffect, useState } from "react";
import { City, Region } from "types";


interface prop {
  setShowAddCity: React.Dispatch<React.SetStateAction<boolean>>;
  cities: string[];
  all_cities: City[];
  onAddCity: (city_name: string) => void;
}

const AddCitytoRegion = ({ setShowAddCity, cities, all_cities, onAddCity }: prop) => {


  const filtered_cities = all_cities.filter((city: City) => { return(!cities.includes(city.city_name)) })
  const numColumns = Math.min(filtered_cities.length, 5); // calculate number of columns

  console.log('logging num of columns')
  console.log(numColumns)

  const onCitySelect = (city_name: string) => {
    onAddCity(city_name)
  };

  const insertCities = () => {
    
    return filtered_cities.map((city: City) => (
      <button
        className="flex flex-row px-4 py-2 bg-gray-100 rounded hover:bg-gray-300 justify-center active:scale-95"
        value={city.city_name}
        key={city.city_id}
        onClick={() => onCitySelect(city.city_name)}
        title={city.state}
      >
        <div className="px-2">{city.city_name}</div>
      </button>
    ));
  };

  

  return (
    <div className="fixed h-screen w-screen flex items-center justify-center ">
      <div className="flex flex-col items-center bg-white px-8 py-8 z-10 rounded ">
        <h2 className="text-xl text-center"> Select City</h2>
        <div
          className={`grid grid-cols-${numColumns} grid-rows-5 gap-x-2 gap-y-2 mt-6`}
        >
          {insertCities()}
        </div>
        <div className="w-full text-right">
          <button className=" px-4 py-2 text-right hover:underline hover:underline-offset-1 text-slate-700 hover:text-black active:scale-95"
          onClick = {() => setShowAddCity(false)}
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="fixed inset-0 bg-black opacity-50 "></div>
    </div>
  );
};

export default AddCitytoRegion;
