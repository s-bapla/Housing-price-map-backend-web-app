import Header from "@/components/Header";
import SideNav from "@/components/SidNav";
import ZillowEstimates from "@/components/ZillowEstimates";
import { House, ZillowEstimate } from "types";
import zillowEstimatesService from "@/services/zillow-estimates-service";
import housesService from "@/services/homes-service";
import { useZillowEstimates } from "@/hooks/useZillowEstimates";

// Fetch the houses data in the getServerSideProps function
export async function getServerSideProps() {
  try {
    let zillowEstimates = await zillowEstimatesService.getZillowEstimates();
    let houses = await housesService.getAllHomes();
    return { props: { zillowEstimates, houses } };
  } catch (err) {
    const zillowEstimates = [] as ZillowEstimate[];
    const houses = [] as House[];
    return { props: { zillowEstimates, houses } };
  }
}

interface ZillowEstimatesPageProps {
  zillowEstimates: ZillowEstimate[];
  houses: House[];
}


const ZillowEstimatesPage = ({ zillowEstimates, houses }: ZillowEstimatesPageProps) => {
  const {
    zillowEstimates: zEstimates,
    createZillowEstimate,
    updateZillowEstimate,
    deleteZillowEstimate,
  } = useZillowEstimates(zillowEstimates);



  return (
    <div className="bg-gray-50 h-screen">
      <Header />
      <div className="flex flex-row h-screen">
        <SideNav />
        <div className="flex flex-col items-center bg-gray-50 w-full">
          <ZillowEstimates
            zillowEstimates={zEstimates}
            houses={houses}
            onCreate={createZillowEstimate}
            onUpdate={updateZillowEstimate}
            onDelete={deleteZillowEstimate}
          />
        </div>
      </div>
    </div>
  );
};

export default ZillowEstimatesPage;
