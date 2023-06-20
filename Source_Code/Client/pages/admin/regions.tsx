import Header from "@/components/Header";
import SideNav from "@/components/SidNav";
import CreateCity from "@/components/CreateCity";
import { City, Region } from "types";

import { useState } from "react";
import RegionsSelector from "@/components/RegionSelector";
import Regiondetails from "@/components/RegionDetails";
import regionsService from "@/services/regions-service";
import citiesService from "@/services/cities-service";

export async function getServerSideProps() {
  try {
    let regions = await regionsService.getRegions();
    let all_cities = await citiesService.getCities();
    return { props: { regions, all_cities } };
  } catch (err) {
    const regions = [] as Region[];
    const all_cities = [] as City[];
    return { props: { regions, all_cities } };
  }


}

interface props {
  regions: Region[];
  all_cities: City[];
}

const RegionsPage = ({ regions, all_cities }: props) => {
  const [currentRegion, setCurrentRegion] = useState<Region | undefined>(
    undefined
  );

  return (
    <div className="bg-gray-50 h-screen">
      <Header />
      <div className="flex flex-row h-screen ">
        <SideNav />
        <div className="flex flex-col items-center bg-gray-50 w-full">
          <RegionsSelector setCurrentRegion={setCurrentRegion} regions={regions}/>
          {currentRegion && <Regiondetails currentRegion={currentRegion} all_cities={all_cities}/>}
        </div>
      </div>
    </div>
  );
};

export default RegionsPage;
