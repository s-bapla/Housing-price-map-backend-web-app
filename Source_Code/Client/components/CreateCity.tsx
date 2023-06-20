import statesService from "@/services/states-service";
import { useEffect, useState } from "react";
import { City, State } from "types";
import citiesService from "@/services/cities-service";

interface prop {
  setShowCreateCity: React.Dispatch<React.SetStateAction<boolean>>;
  setStateCities: React.Dispatch<React.SetStateAction<any>>;
  currentCity: City | undefined;
  states: State[];
}

const CreateCity = ({ setShowCreateCity, setStateCities,currentCity, states }: prop) => {
  const [city_name, setCityName] = useState("");
  const [state_name, setStateName] = useState("");

  useEffect(() => {
    if (currentCity) {
      setCityName(currentCity.city_name);
      setStateName(currentCity.state);
    }
  }, [currentCity]);

  const onCreate = async () => {
    console.log("onSubmit");
    try{
      const state = states.find((state) => state.name === state_name);

      if (!state) {
        throw new Error("State not found");
      }else{
  
        const new_city = {"city_name": city_name, "state_id": state?.state_id as number}  
        // now update the city using the citiesRouter
        await citiesService.createCity(new_city);
        
        const new_cities = await citiesService.getCities();
        
        setStateCities(new_cities);

        setShowCreateCity(false);
      }
    }catch(err){
      console.log(err);
    }


  }

  const onEdit = async () => {
    console.log("onSubmit");

    try {
      if (currentCity) {
        // find the state id from the cities state name
        console.log(states)
        const state = states.find((state) => state.name === state_name);

        if (!state) {
          throw new Error("State not found");
        }else{
          currentCity.state_id = state?.state_id as number;
          const updated_city = {"city_id" : currentCity.city_id as number, "city_name": city_name, "state_id": state?.state_id as number}  
          // now update the city using the citiesRouter
          await citiesService.updateCity(updated_city);

          const new_cities = await citiesService.getCities();
        
          setStateCities(new_cities);

          setShowCreateCity(false);
        }

      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed h-screen w-screen flex items-center justify-center ">
      <div className="bg-white px-8 py-8 z-10 rounded flex flex-col items-center">
        {currentCity ? (
          <h2 className="text-xl text-center">Edit City</h2>
        ) : (
          <h2 className="text-xl text-center">Add City</h2>
        )}
        <div className="grid grid-cols-2 gap-x-2 gap-y-2 mt-6">
          <div className="flex flex-col">
            <label
              htmlFor="city_name"
              className="block text-sm font-medium text-gray-700 text-left pl-2"
            >
              City Name
            </label>
            <input
              type="text"
              name="city_name"
              id="city_name"
              value={city_name}
              onChange={(e) => setCityName(e.target.value)}
              className=" border rounded-md pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2 sm:text-sm text-left"
              placeholder="Street"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="state_name"
              className="block text-sm font-medium text-gray-700 text-left pl-2"
            >
              State Name
            </label>
            <input
              type="text"
              name="state_name"
              id="state_name"
              value={state_name}
              onChange={(e) => setStateName(e.target.value.toString())}
              className=" border rounded-md pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2 sm:text-sm text-left"
              placeholder="state_name"
            />
          </div>
        </div>
        {currentCity ? (
          <button
            className="rounded px-4 py-2 shadow text-white bg-black mt-8 hover:bg-black active:scale-95 mr-6"
            onClick={onEdit}
          >
            Submit
          </button>
        ) : (
          <button
            className="rounded px-4 py-2 shadow text-white bg-black mt-8 hover:bg-black active:scale-95 mr-6"
            onClick={onCreate}
          >
            Submit
          </button>
        )}
        <div className="flex  w-full justify-end">
          <button
            className="text-black mt-8  active:scale-95 hover:text-black hover:underline hover:underline-offset-1 "
            onClick={() => setShowCreateCity(false)}
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="fixed inset-0 bg-black opacity-50 "></div>
    </div>
  );
};

export default CreateCity;
