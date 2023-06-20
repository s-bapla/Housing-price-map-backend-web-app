import { useState, useEffect } from "react";

const RegionStatisticModal = ({ isEdit, showModal, closeModal, handleSubmit, selectedStatistic }) => {
  const [regionId, setRegionId] = useState('');
  const [avgPricePerSqFt, setAvgPricePerSqFt] = useState('');
  const [meanHousingPrice, setMeanHousingPrice] = useState('');
  const [fiveYearPriceGradient, setFiveYearPriceGradient] = useState('');
  const [tenYearPriceGradient, setTenYearPriceGradient] = useState('');
  const [medianHousingPrice, setMedianHousingPrice] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (selectedStatistic) {
      setRegionId(selectedStatistic.region_id);
      setAvgPricePerSqFt(selectedStatistic.avg_price_per_sq_ft);
      setMeanHousingPrice(selectedStatistic.mean_housing_price);
      setFiveYearPriceGradient(selectedStatistic.five_year_price_gradient);
      setTenYearPriceGradient(selectedStatistic.ten_year_price_gradient);
      setMedianHousingPrice(selectedStatistic.median_housing_price);
      setDate(selectedStatistic.date);
    }
  }, [selectedStatistic]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({
      region_id: regionId,
      avg_price_per_sq_ft: avgPricePerSqFt,
      mean_housing_price: meanHousingPrice,
      five_year_price_gradient: fiveYearPriceGradient,
      ten_year_price_gradient: tenYearPriceGradient,
      median_housing_price: medianHousingPrice,
      date,
    });
    closeModal();
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${showModal ? "" : "hidden"}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {isEdit ? "Edit" : "Add"} Region Statistic
                </h3>
                <form onSubmit={onSubmit}>
                  {/* Region ID */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="regionId">
                      Region ID
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="regionId"
                      type="number"
                      value={regionId}
                      onChange={(e) => setRegionId(e.target.value)}
                      required
                    />
                                </div>
              {/* Avg Price Per Sq Ft */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avgPricePerSqFt">
                  Avg Price per Sq Ft
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="avgPricePerSqFt"
                  type="number"
                  step="0.01"
                  value={avgPricePerSqFt}
                  onChange={(e) => setAvgPricePerSqFt(e.target.value)}
                  required
                />
              </div>
              {/* Mean Housing Price */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="meanHousingPrice">
                  Mean Housing Price
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="meanHousingPrice"
                  type="number"
                  step="0.01"
                  value={meanHousingPrice}
                  onChange={(e) => setMeanHousingPrice(e.target.value)}
                  required
                />
              </div>
              {/* Five Year Price Gradient */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fiveYearPriceGradient">
                  Five Year Price Gradient
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="fiveYearPriceGradient"
                  type="number"
                  step="0.01"
                  value={fiveYearPriceGradient}
                  onChange={(e) => setFiveYearPriceGradient(e.target.value)}
                  required
                />
              </div>
              {/* Ten Year Price Gradient */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tenYearPriceGradient">
                  Ten Year Price Gradient
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="tenYearPriceGradient"
                  type="number"
                  step="0.01"
                  value={tenYearPriceGradient}
                  onChange={(e) => setTenYearPriceGradient(e.target.value)}
                  required
                />
              </div>
              {/* Median Housing Price */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medianHousingPrice">
                  Median Housing Price
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="medianHousingPrice"
                  type="number"
                  step="0.01"
                  value={medianHousingPrice}
                  onChange={(e) => setMedianHousingPrice(e.target.value)}
                  required
                />
              </div>
              {/* Date */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                  Date
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isEdit ? "Update" : "Create"} Region Statistic
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="bg-white font-bold rounded px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none focus:shadow-outline"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  </div>
</div>

);
};

export default RegionStatisticModal;
