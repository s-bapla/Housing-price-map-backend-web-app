import Header from "@/components/Header";
import SideNav from "@/components/SidNav";
import { City, House } from "types";
import CreateHouse from "@/components/CreateHouse";
import DeleteModal from "@/components/DeleteModal";
import citiesService from "@/services/cities-service";
import homesService from "@/services/homes-service";
import HousesComponent from "@/components/HousesTable";

// import { cities, homes } from "@/data/ex_data.js";
import { useEffect, useState } from "react";

export async function getServerSideProps() {
  try {
    let cities = await citiesService.getCities();
    const city_id = cities[0].city_id;
    const input_homes = await homesService.getHomes(city_id);
    return { props: { cities, input_homes } };
  } catch (err) {
    const cities = [] as City[];
    const input_homes = [] as any[];
    return { props: { cities, input_homes } };
  }
}

interface prop {
  cities: City[];
  input_homes: House[];
}

const HousesPage = ({ cities, input_homes }: prop) => {
  console.log("re-rendering page");
  const [homes, setStateHomes] = useState(input_homes);
  const [showCreateHouse, setShowCreateHouse] = useState(false);
  const [currentHouse, setCurrentHouse] = useState(undefined);
  const [currentCity, setCurrentCity] = useState<City >(cities[0]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [shouldDelete, setShouldDelete] = useState(false);
  const [should_delete_object_name, setShouldDeleteObjectName] = useState("");

  useEffect(() => {
    console.log('inside the use Effect')
    updateHomes();
  }, [currentCity]);

  const updateHomes = async () => {
      console.log("inside call back function updating homes");
      const updated_homes = await homesService.getHomes(
        currentCity.city_id as number
      );
      setStateHomes(updated_homes);
    
  };

  const insertCities = () => {
    return cities.map((city: any) => (
      <option value={city.city_id} key={city.city_id}>
        {city.city_name}
      </option>
    ));
  };

  const onCitySelect = async (city_id: string) => {
    const selected_city = cities.find(
      (city) => {
        return(
          city.city_id === parseInt(city_id)
        )
      }
    ) as City;
    setCurrentCity(selected_city);
  };

  return (
    <div className="bg-gray-50 h-screen">
      <Header />
      <div className="flex flex-row h-screen ">
        <SideNav />

        <div className="flex flex-col justify-start w-full bg-gray-50 mt-4">
          <div className="flex mb-6">
            <label className="mr-3 content-center text-lg">Select City</label>
            <select
              className="border px-4 bg-white text-lg"
              onChange={(e) => onCitySelect(e.target.value)}
            >
              {insertCities()}
            </select>
          </div>
          {cities.length === 0 && homes.length === 0 && (
            <div className="flex flex-col justify-center items-center w-full">
              <h1 className="text-2xl font-bold">No cities or homes found</h1>
              <h1 className="text-2xl font-bold">
                Please add a city and a home
              </h1>
            </div>
          )}
          <HousesComponent
            setShowCreateHouse={setShowCreateHouse}
            setCurrentHouse={setCurrentHouse}
            setShowDeleteModal={setShowDeleteModal}
            setCurrentCity={setCurrentCity}
            cities={cities}
            updateHomes={updateHomes}
            homes={homes}
          />
        </div>
        {showCreateHouse && (
          <CreateHouse
            setShowCreateHouse={setShowCreateHouse}
            updateHomes={updateHomes}
            currentHouse={currentHouse}
            currentCity={currentCity}
            cities={cities}
          />
        )}
        {showDeleteModal && (
          <DeleteModal
            setShowDeleteModal={setShowDeleteModal}
            setShouldDelete={setShouldDelete}
          />
        )}
      </div>
    </div>
  );
};

export default HousesPage;
