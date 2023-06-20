import Header from "@/components/Header";
import SideNav from "@/components/SidNav";
import RegionStatisticModal from "@/components/RegionStatisticModal";
import { useState, useEffect } from "react";
import axios from "axios";

const RegionStatisticsPage = () => {
  return (
    <div className="bg-gray-50 h-screen">
      <Header />
      <div className="flex flex-row h-screen ">
        <SideNav />
        <div className="flex flex-row justify-center w-full bg-gray-50">
          <RegionStatistics />
        </div>
      </div>
    </div>
  );
};

const RegionStatistics = () => {
  const [statistics, setStatistics] = useState([]);
  const [selectedStatistic, setSelectedStatistic] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchRegionStatistics();
  }, []);

  const fetchRegionStatistics = async () => {
    
    const response = await axios.get("http://flip1.engr.oregonstate.edu:9178/api/region-statistics");
    setStatistics(response.data);
  };

  const createRegionStatistic = async (statistic) => {
    
    await axios.post("http://flip1.engr.oregonstate.edu:9178/region-statistics", statistic);
    fetchRegionStatistics();
  };

  const updateRegionStatistic = async (updatedStatistic) => {
    const { region_statistic_id } = selectedStatistic;
    await axios.put(`http://flip1.engr.oregonstate.edu:9178/api/region-statistics/${region_statistic_id}`, updatedStatistic);
    fetchRegionStatistics();
  };
  
  const handleDelete = async (region_statistic_id) => {
    
    await axios.delete(`http://flip1.engr.oregonstate.edu:9178/api/region-statistics/${region_statistic_id}`);
    fetchRegionStatistics();
  };

  const openCreateModal = () => {
    setIsEdit(false);
    setSelectedStatistic(null);
    setShowModal(true);
  };

  const openEditModal = (statistic) => {
    setIsEdit(true);
    setSelectedStatistic(statistic);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="container mx-auto mt-8">
        {/* Add Region Statistic Button */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={openCreateModal}
        >
          Add Region Statistic
        </button>

        {/* Region Statistics Table */}
        <table className="table-auto w-full">
  <thead>
    <tr>
      <th className="px-4 py-2">ID</th>
      <th className="px-4 py-2">Region ID</th>
      <th className="px-4 py-2">Avg Price per Sq Ft</th>
      <th className="px-4 py-2">Mean Housing Price</th>
      <th className="px-4 py-2">Five Year Price Gradient</th>
      <th className="px-4 py-2">Ten Year Price Gradient</th>
      <th className="px-4 py-2">Median Housing Price</th>
      <th className="px-4 py-2">Date</th>
      <th className="px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {statistics.map((statistic) => (
      <tr key={statistic.region_statistic_id}>
        <td className="border px-4 py-2">{statistic.region_statistic_id}</td>
        <td className="border px-4 py-2">{statistic.region_id}</td>
        <td className="border px-4 py-2">{statistic.avg_price_per_sq_ft}</td>
        <td className="border px-4 py-2">{statistic.mean_housing_price}</td>
        <td className="border px-4 py-2">{statistic.five_year_price_gradient}</td>
        <td className="border px-4 py-2">{statistic.ten_year_price_gradient}</td>
        <td className="border px-4 py-2">{statistic.median_housing_price}</td>
        <td className="border px-4 py-2">{statistic.date}</td>
        <td className="border px-4 py-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
            onClick={() => openEditModal(statistic)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            onClick={() => handleDelete(statistic.region_statistic_id)}
          >
            Delete
            </button>
    </td>
  </tr>
))}
</tbody>

          {/* ... */}
        </table>
      </div>

      <RegionStatisticModal
        isEdit={isEdit}
        showModal={showModal}
        closeModal={closeModal}
        handleSubmit={isEdit ? updateRegionStatistic : createRegionStatistic}
        selectedStatistic={selectedStatistic}
      />
    </>
  );
};


export default RegionStatisticsPage;

