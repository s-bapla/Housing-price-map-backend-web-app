import { useState, useEffect } from 'react';
import citiesService from '../services/cities-service';

function useCitiesAndHomes() {
  const [data, setData] = useState({ cities: [], homes: [] });

  useEffect(() => {
    async function fetchData() {
      const cities = await citiesService.getCities();
      const city_id = cities[0].city_id;
      const query_data = { cityid: city_id };
      const queryParams = new URLSearchParams(query_data).toString();
      const homes_url = `http://flip1.engr.oregonstate.edu:9178/Homes?${queryParams}`;
      const res = await fetch(homes_url);
      const homes = await res.json();
      setData({ cities, homes });
    }

    fetchData();
  }, []);

  return data;
}