import { useState, useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card } from "../../../components/UI/Card";
import PropTypes from "prop-types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const tabs = [
  { code: "number", name: "Number of strikes" },
  { code: "mass", name: "Average mass" },
  { code: "year", name: "Strikes by year" },
  { code: "recclass", name: "Strikes by composition" },
];

export default function BarChart({ searchedMetheroite = [], metheroite = [] }) {
  const [tabContent, setTabContent] = useState("year");
  const [strikeByYear, setStrikeByYear] = useState({});
  const [strikeByClass, setStrikeByClass] = useState({});
  const [averageMass, setAverageMass] = useState(0);
  const [loading, setLoading] = useState(true);

  const dataArray = searchedMetheroite.length ? searchedMetheroite : metheroite;

  // Process the data whenever the array changes
  useEffect(() => {
    if (!dataArray || dataArray.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const byYear = {};
    const byClass = {};
    let totalMass = 0;
    let countWithMass = 0;

    dataArray.forEach((item) => {
      if (item.year) {
        const year = new Date(item.year).getFullYear();
        if (!isNaN(year)) byYear[year] = (byYear[year] || 0) + 1;
      }

      if (item.recclass) byClass[item.recclass] = (byClass[item.recclass] || 0) + 1;

      if (item.mass && !isNaN(Number(item.mass))) {
        totalMass += Number(item.mass);
        countWithMass++;
      }
    });

    setStrikeByYear(byYear);
    setStrikeByClass(byClass);
    setAverageMass(countWithMass ? totalMass / countWithMass : 0);
    setLoading(false);
  }, [dataArray]);

  // Tab-aware chart data
  const chartData = useMemo(() => {
    if (tabContent === "year") {
      const labels = Object.keys(strikeByYear).sort();
      const data = labels.map((label) => strikeByYear[label]);
      return { labels, datasets: [{ data, backgroundColor: "rgba(53, 162, 235, 0.5)" }] };
    } else if (tabContent === "recclass") {
      const labels = Object.keys(strikeByClass);
      const data = labels.map((label) => strikeByClass[label]);
      return { labels, datasets: [{ data, backgroundColor: "rgba(53, 162, 235, 0.5)" }] };
    }
    return null;
  }, [tabContent, strikeByYear, strikeByClass]);

  // Chart options
  const chartOptions = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: tabs.find((tab) => tab.code === tabContent)?.name || "",
        },
      },
      scales: { y: { ticks: { precision: 0 } } },
    };
  }, [tabContent]);

  const changeTab = (code) => setTabContent(code);

  // Loading or empty state
  if (loading) {
    return (
      <Card className="shadow-lg mx-auto px-5 py-6">
        <p className="text-center text-gray-500">Loading...</p>
      </Card>
    );
  }

  if (!dataArray || dataArray.length === 0) {
    return (
      <Card className="shadow-lg mx-auto px-5 py-6">
        <p className="text-center text-gray-500">No data available</p>
      </Card>
    );
  }

  return (
    <div className="flex items-center">
      <div className="mx-auto w-full max-w-[1450px] self-start">
        <Card className="shadow-lg shadow-indigo-300 mx-auto px-5 py-6">
          {/* Tabs */}
          <div className="sm:flex justify-center gap-[12px]">
            {tabs.map((tab) => (
              <button
                key={tab.code}
                onClick={() => changeTab(tab.code)}
                className={`text-indigo-500 rounded-md px-[16px] w-full mb-4 sm:w-auto py-[4px] border-2 border-indigo-400 font-medium hover:bg-gray-100 hover:text-slate-800 hover:border-indigo-900 focus:ring-2 focus:outline-none focus:ring-indigo-900 focus:text-slate-800 focus:bg-indigo-200 ${tabContent === tab.code ? "bg-indigo-200 border-indigo-900 text-slate-800" : ""
                  }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Chart / Info */}
          <div className="flex justify-center max-h-[600px] mx-auto">
            {tabContent === "number" && (
              <p className="bg-[rgba(53,_162,_235,_0.5)] rounded-xl px-5 py-5 mt-5 text-white font-bold sm:text-4xl text-center">
                Total Number of Strikes: {dataArray.length}
              </p>
            )}
            {tabContent === "mass" && (
              <p className="bg-[rgba(53,_162,_235,_0.5)] rounded-xl px-5 py-5 mt-5 text-white font-bold sm:text-4xl text-center">
                Average Meteorite Mass: {averageMass.toLocaleString("en-US")} g
              </p>
            )}
            {(tabContent === "year" || tabContent === "recclass") && chartData && (
              <Bar options={chartOptions} data={chartData} />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

BarChart.propTypes = {
  searchedMetheroite: PropTypes.array,
  metheroite: PropTypes.array,
};
