import { Card } from "../../UI/Card";
import { useState, useMemo } from "react";
import { MeteoriteLine } from "./MeteoriteLine";
import { MeteoriteLineLoading } from "./MeteoriteLineLoading";
import { Pagination } from "../../UI/Pagination/Pagination";
import { ToggleButton } from "../../UI/ToggleButton";
import { useApiContext } from "../../../contexts/APIcontext";

export const DataListComponent = () => {
  const { filteredSearchInput, loading } = useApiContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState({ column: "", order: "asc" });

  const PageSize = 9;

  const currentTableData = useMemo(() => {
    const sortedData = [...filteredSearchInput];

    if (sortBy.column) {
      sortedData.sort((a, b) => {
        let valA = a[sortBy.column];
        let valB = b[sortBy.column];

        // Ensure values exist
        if (valA === undefined || valA === null) valA = sortBy.column === "mass" ? 0 : "";
        if (valB === undefined || valB === null) valB = sortBy.column === "mass" ? 0 : "";

        // Numeric sorting
        if (sortBy.column === "mass") {
          return sortBy.order === "asc" ? valA - valB : valB - valA;
        }

        // Date sorting
        if (sortBy.column === "year") {
          const dateA = valA ? new Date(valA) : new Date(0);
          const dateB = valB ? new Date(valB) : new Date(0);
          return sortBy.order === "asc" ? dateA - dateB : dateB - dateA;
        }

        // Default string sorting
        if (valA.toString().toLowerCase() < valB.toString().toLowerCase()) return sortBy.order === "asc" ? -1 : 1;
        if (valA.toString().toLowerCase() > valB.toString().toLowerCase()) return sortBy.order === "asc" ? 1 : -1;
        return 0;
      });
    }

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return sortedData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredSearchInput, sortBy]);

  const handleToggleClick = (columnName) => {
    if (sortBy.column === columnName) {
      setSortBy({
        column: columnName,
        order: sortBy.order === "asc" ? "desc" : "asc",
      });
    } else {
      setSortBy({ column: columnName, order: "asc" });
    }
  };

  return (
    <div className="flex justify-between mt-[160px] mb-6 px-[20px] md:mt-[140px]">
      <Card className="shadow-md shadow-indigo-200 w-full">
        <>
          <div className="block md:flex md:space-y-3 justify-between items-center pb-5 p-3">
            <h3 className="font-semibold text-black text-2xl py-2">
              #{filteredSearchInput.length} Meteorite strikes
            </h3>
            <div className="flex flex-wrap gap-2">
              <ToggleButton name="Name" onClick={() => handleToggleClick("name")} />
              <ToggleButton name="Recclass" onClick={() => handleToggleClick("recclass")} />
              <ToggleButton name="Mass" onClick={() => handleToggleClick("mass")} />
              <ToggleButton name="Year" onClick={() => handleToggleClick("year")} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-2 max-h-[800px] overflow-auto">
            {loading ? (
              <>
                <MeteoriteLineLoading />
                <MeteoriteLineLoading />
                <MeteoriteLineLoading />
                <MeteoriteLineLoading />
                <MeteoriteLineLoading />
                <MeteoriteLineLoading />
              </>
            ) : currentTableData.length > 0 ? (
              currentTableData.map((item, index) => (
                <MeteoriteLine
                  key={item.id || `${item.name}-${index}`}
                  data={item}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-4">
                No meteorite data found.
              </p>
            )}
          </div>

          <div className="flex p-3 justify-center">
            <Pagination
              currentPage={currentPage}
              totalCount={filteredSearchInput.length}
              pageSize={PageSize}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      </Card>
    </div>
  );
};
