import { Suspense } from "react";
import { SearchComponent } from "../components/User/SearchComponent/SearchComponent";
import { Card } from "../components/UI/Card";
import { DataListComponent } from "../components/User/DataSummaryComponent/DataListComponent";
import { MetricsComponent } from "../components/User/MetricsComponent/MetricsComponent";
import { ApiContextProvider } from "../contexts/APIcontext";
import { SummaryMetricComponent } from "../components/User/SummaryMetricComponent/SummaryMetricComponent";

export const SearchPage = () => {
  return (
    <ApiContextProvider>
      <main className="w-full min-h-screen content-center bg-[#F7FAFF]">
        {/* Top Search Card */}
        <div className="relative bg-indigo-700 h-56 md:h-40">
          <Card className="absolute mx-auto shadow-lg shadow-indigo-300 min-h-[18vh] w-[90%] top-[20%] left-0 right-0 md:w-[90%] md:top-[35%] xl:w-[50%] lg:min-h-[15vh]">
            {/* <Card className="absolute mx-auto shadow-lg shadow-indigo-300 min-h-[18vh] w-[90%] top-[20%] left-0 right-0 md:w-[90%] md:top-[40%] xl:w-[50%] lg:top-[60%] lg:min-h-[15vh]"> */}
            <SearchComponent />
          </Card>
        </div>

        {/* Meteorite Data List */}
        <DataListComponent />

        {/* Metrics & Charts */}
        <Suspense fallback={<div className="text-center py-4">Loading meteor data...</div>}>
          <SummaryMetricComponent />
          <MetricsComponent />
        </Suspense>
      </main>
    </ApiContextProvider>
  );
};
