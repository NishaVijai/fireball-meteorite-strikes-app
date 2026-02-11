import { useApiContext } from "../../../contexts/APIcontext";
import BarChart from "./BarChart";
import Skeleton from "react-loading-skeleton";

export const SummaryMetricComponent = () => {
  const { meteoriteData = [], filteredSearchInput = [], loading } = useApiContext();

  return (
    <div className="w-full sm:px-20">
      {loading ? (
        <div className="mx-auto w-full max-w-[1450px]">
          <Skeleton count={3} height={60} className="mb-4" />
          <Skeleton height={500} />
        </div>
      ) : (
        <BarChart
          metheroite={meteoriteData}          // full dataset
          searchedMetheroite={filteredSearchInput} // filtered dataset
        />
      )}
    </div>
  );
};
