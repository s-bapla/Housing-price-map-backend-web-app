import { useState } from "react";
import zillowEstimatesService from "@/services/zillow-estimates-service";
import { ZillowEstimate } from "types";

export const useZillowEstimates = (initialZillowEstimates: ZillowEstimate[]) => {
  const [zillowEstimates, setZillowEstimates] = useState<ZillowEstimate[]>(initialZillowEstimates);

  const createZillowEstimate = async (newEstimate: ZillowEstimate) => {
    try {
      const createdEstimate = await zillowEstimatesService.createZillowEstimate(newEstimate);
      setZillowEstimates([...zillowEstimates, createdEstimate]);
    } catch (error) {
      console.error("Error creating Zillow Estimate:", error);
      // Display error message to user
    }
  };

  const updateZillowEstimate = async (updatedEstimate: ZillowEstimate) => {
    try {
      await zillowEstimatesService.updateZillowEstimate(updatedEstimate);
      setZillowEstimates(
        zillowEstimates.map((estimate) =>
          estimate.zillow_price_id === updatedEstimate.zillow_price_id ? updatedEstimate : estimate
        )
      );
    } catch (error) {
      console.error("Error updating Zillow Estimate:", error);
      // Display error message to user
    }
  };

  const deleteZillowEstimate = async (zillowPriceId: number) => {
    try {
      await zillowEstimatesService.deleteZillowEstimate(zillowPriceId);
      setZillowEstimates(zillowEstimates.filter((estimate) => estimate.zillow_price_id !== zillowPriceId));
    } catch (error) {
      console.error("Error deleting Zillow Estimate:", error);
      // Display error message to user
    }
  };

  return { zillowEstimates, createZillowEstimate, updateZillowEstimate, deleteZillowEstimate };
};
