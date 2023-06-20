import Home from "@/pages";
import homesService from "@/services/homes-service";
import { useEffect, useState } from "react";
import { House, City } from "types";

const cities_url = "http://flip1.engr.oregonstate.edu:9178/dropdown_cities";

interface prop {
  setShowCreateHouse: React.Dispatch<React.SetStateAction<boolean>>;
  updateHomes: () => void;
  currentHouse: House | undefined;
  currentCity: City | undefined;
  cities: City[];
}

const CreateHouse = ({
  setShowCreateHouse,
  currentHouse,
  updateHomes,
  currentCity,
  cities,
}: prop) => {
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [sq_ft, setSqft] = useState("");
  const [num_of_bed, setBeds] = useState("");
  const [num_of_bath, setBaths] = useState("");
  const [city, setCity] = useState("");

  const [year_built, setYear] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  useEffect(() => {
    console.log("inside use effect");
    if (currentCity) {
      setCity(currentCity.city_name);
    }
    if (currentHouse) {
      setStreet(currentHouse.street);
      setZip(currentHouse.zip);
      setSqft(currentHouse.sq_ft.toString());
      setBeds(currentHouse.num_of_bed.toString());
      setBaths(currentHouse.num_of_bath.toString());
      setCity(currentHouse.city_name as string);
      setYear(currentHouse.year_built.toString());
      setLat(currentHouse.lat.toString());
      setLng(currentHouse.lng.toString());
    }
  }, [currentHouse]);

  const onSetCity = (city_name: string) => {
    console.log("inside on set city");
    setCity(city_name);
  };

  const onEditHouse = async () => {
    console.log("inside on edit house");


    try {
      const city_id = cities.find(
        (current_city) => current_city.city_name === city
      )?.city_id;

      const updated_house = {
        home_id: currentHouse?.home_id,
        street: street,
        sq_ft: parseInt(sq_ft),
        num_of_bed: parseInt(num_of_bed),
        num_of_bath: parseInt(num_of_bath),
        year_built: parseInt(year_built),
        lat: parseInt(lat),
        lng: parseInt(lng),
        zip: zip,
        city_name: city
      };

      const response = await homesService.updateHome(updated_house);
      updateHomes();
      setShowCreateHouse(false);

    } catch (error) {
      console.log(error);
    }
  };

  const onCreateHouse = async () => {
    console.log("inside on create house");
    try {
      const city_id = cities.find(
        (current_city) => current_city.city_name === city
      )?.city_id;

      const new_house = {
        street: street,
        sq_ft: parseInt(sq_ft),
        num_of_bed: parseInt(num_of_bed),
        num_of_bath: parseInt(num_of_bath),
        year_built: parseInt(year_built),
        lat: parseInt(lat),
        lng: parseInt(lng),
        zip: zip,
        city_id: city_id as number,
        city_name: city,
      };

      const returned_new_home = await homesService.createHome(new_house);
      updateHomes();
      setShowCreateHouse(false);
    } catch (error) {
      console.log(error);
    }
  };

  const insertCities = () => {
    return cities.map((city: any) => (
      <option value={city.city_name} key={city.city_id}>
        {city.city_name}
      </option>
    ));
  };

  return (
    <div className="fixed h-screen w-screen flex items-center justify-center ">
      <div className="bg-white px-8 py-8 z-10 rounded flex flex-col items-center">
        {currentHouse ? (
          <h2 className="text-xl text-center">Edit House</h2>
        ) : (
          <h2 className="text-xl text-center">Add House</h2>
        )}
        <div className="grid grid-cols-2 gap-x-2 gap-y-2 mt-6">
          <div className="flex flex-col">
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700 text-left pl-2"
            >
              Street
            </label>
            <input
              type="text"
              name="street"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className=" border rounded-md pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2 sm:text-sm text-left"
              placeholder="Street"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 text-left pl-2"
            >
              City
            </label>
            <select
              className=" border rounded-md pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2 sm:text-sm text-left"
              placeholder="City"
              value={city}
              onChange={(e) => onSetCity(e.target.value)}
            >
              {insertCities()}
            </select>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="zip"
              className="block text-sm font-medium text-gray-700 text-left pl-2"
            >
              Zipcode
            </label>
            <input
              type="number"
              name="zip"
              id="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value.toString())}
              className=" border rounded-md pl-2  py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2 sm:text-sm text-left"
              placeholder="Zipcode"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="sq_ft"
              className="block text-sm font-medium text-gray-700 text-left pl-2"
            >
              Square Feet
            </label>
            <input
              type="number"
              name="sq_ft"
              id="sq_ft"
              value={sq_ft}
              onChange={(e) => setSqft(e.target.value.toString())}
              className=" border rounded-md pl-2  py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2 sm:text-sm text-left"
              placeholder="Square Feet"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="num_of_bed"
              className="block text-sm font-medium text-gray-700 text-left pl-2"
            >
              Number of Beds
            </label>
            <input
              type="number"
              name="num_of_bed"
              id="num_of_bed"
              value={num_of_bed}
              onChange={(e) => setBeds(e.target.value.toString())}
              className=" border rounded-md pl-2  py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2 sm:text-sm text-left"
              placeholder="Number of Beds"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="num_of_baths"
              className="block text-sm font-medium text-gray-700 text-left pl-2"
            >
              Number of Baths
            </label>
            <input
              type="number"
              name="num_of_bath"
              id="num_of_bath"
              value={num_of_bath}
              onChange={(e) => setBaths(e.target.value.toString())}
              className=" border rounded-md pl-2  py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2 sm:text-sm text-left"
              placeholder="Number of Baths"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="year_built"
              className="block text-sm font-medium text-gray-700 text-left pl-2"
            >
              Year Built
            </label>
            <input
              type="number"
              name="year_built"
              id="year_built"
              value={year_built}
              onChange={(e) => setYear(e.target.value.toString())}
              className=" border rounded-md pl-2  py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2 sm:text-sm text-left"
              placeholder="2023"
            />
          </div>
          <div className="grid grid grid-cols-2">
            <div className="flex flex-col w-32">
              <label
                htmlFor="lat"
                className="block text-sm font-medium text-gray-700 text-left pl-2"
              >
                Latitude
              </label>
              <input
                type="number"
                name="lat"
                id="lat"
                value={lat}
                onChange={(e) => setLat(e.target.value.toString())}
                className=" border rounded-md pl-2  py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2 sm:text-sm text-left"
                placeholder="Latitude"
              />
            </div>
            <div className="flex flex-col w-32">
              <label
                htmlFor="lng"
                className="block text-sm font-medium text-gray-700 text-left pl-2"
              >
                Longitude
              </label>
              <input
                type="number"
                name="lng"
                id="lng"
                value={lng}
                onChange={(e) => setLng(e.target.value.toString())}
                className=" border rounded-md pl-2 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2 sm:text-sm text-left"
                placeholder="Longitude"
              />
            </div>
          </div>
        </div>

        {currentHouse ? (
          <button
            className="rounded px-4 py-2 shadow text-white bg-black mt-8 hover:bg-black active:scale-95 mr-6"
            onClick={onEditHouse}
          >
            Submit
          </button>
        ) : (
          <button
            className="rounded px-4 py-2 shadow text-white bg-black mt-8 hover:bg-black active:scale-95 mr-6"
            onClick={onCreateHouse}
          >
            Submit
          </button>
        )}
        <div className="flex  w-full justify-end">
          <button
            className="text-black mt-8  active:scale-95 hover:text-black hover:underline hover:underline-offset-1 "
            onClick={() => setShowCreateHouse(false)}
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="fixed inset-0 bg-black opacity-50 "></div>
    </div>
  );
};

export default CreateHouse;
