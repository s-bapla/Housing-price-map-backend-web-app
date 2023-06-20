import Header from "@/components/Header";
import SideNav from "@/components/SidNav";
import CreateCity from "@/components/CreateCity";
import { City, State } from "types";
import citiesService from "@/services/cities-service";
import statesService from "@/services/states-service";
import { useState } from "react";


export async function getServerSideProps() {
  try {
    let cities = await citiesService.getCities();
    let states = await statesService.getStates();
    return { props: { cities, states } };
  } catch (err) {
    const cities = [] as City[];
    const states = [] as State[];
    return { props: { cities, states } };
  }
}

interface prop {
  cities: City[];
  states: State[]
}

const CitiesPage = ({cities, states}: prop) => {
  console.log("re-rendering page")
  const [state_cities, setStateCities] = useState(cities);
  const [showCreateCity, setShowCreateCity] = useState(false);
  const [currentCity, setCurrentCity] = useState(undefined);

  return (
    <div className="bg-gray-50 h-screen">
      <Header />
      <div className="flex flex-row h-screen ">
        <SideNav />
        <div className="flex flex-row justify-center w-full bg-gray-50">
          <CitiesComponent
            states = {states}
            cities={state_cities}
            setStateCities={setStateCities}
            setShowCreateCity={setShowCreateCity}
            setCurrentCity={setCurrentCity}
          />
        </div>
        {showCreateCity && (
          <CreateCity
            states = {states}
            setStateCities = {setStateCities}
            setShowCreateCity={setShowCreateCity}
            currentCity={currentCity}
          />
        )}
      </div>
    </div>
  );
};

interface prop {
  setShowCreateCity: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentCity: React.Dispatch<React.SetStateAction<any>>;
  setStateCities: React.Dispatch<React.SetStateAction<any>>;
  cities: City[];
  states: State[]
}

const CitiesComponent = ({
  setShowCreateCity,
  setCurrentCity,
  setStateCities,
  cities,
  states,
}: prop) => {
  const onAdd = () => {
    setCurrentCity(undefined);
    setShowCreateCity(true);
  };

  const onEdit = async (city: City) => {

    setCurrentCity(city);
    setShowCreateCity(true);

  };

  const onDelete = async (id: number) => {
    try {
      await citiesService.deleteCity(id);
      const filteredCities = cities.filter((city) => city.city_id !== id);
      setStateCities(filteredCities);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="w-full h-screen">
        <div className="container mx-auto py-12">
          <div className="flex flex-col items-center justify-center">
            <div className="text-center max-w-screen-lg ">
              <div>
                <h1 className="text-2xl font-bold mb-4">Cities</h1>
                {/* <label className="mr-2">Filter By State</label>
                <input
                  placeholder="State"
                  className=" border rounded-md pl-2 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2 sm:text-sm text-left"
                /> */}
                <div className="shadow bg-white px-8 py-8 rounded text-center mt-4">
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">City</th>
                        <th className="px-4 py-2">State</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cities.map((city, index) => (
                        <tr key={city.city_id}>
                          <td className="border px-4 py-2">{city.city_id}</td>
                          <td className="border px-4 py-2">{city.city_name}</td>
                          <td className="border px-4 py-2">{city.state}</td>
                          <td className="px-4">
                            <button 
                              className="hover:underline hover:underline-offset-1"
                              onClick={() => onEdit(city)}
                            >
                              Edit
                            </button>
                          </td>
                          <td className="px-4">
                            <button className="hover:underline hover:underline-offset-1"
                            onClick={() => onDelete(city.city_id as number)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={onAdd}
                  >
                    Add City
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

export default CitiesPage;
