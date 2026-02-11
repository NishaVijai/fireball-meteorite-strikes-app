import { FaWeightHanging, FaWind, FaArrowsAltV, FaArrowsAltH } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { BsCalendar3 } from "react-icons/bs";
import { PiMapPinFill } from "react-icons/pi";
import { MdEditDocument } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PropTypes from "prop-types";

export const MeteoriteLine = ({ data }) => {
  const [country, setCountry] = useState("Unknown");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true; // cleanup flag
    const findCountry = async () => {
      if (!data?.reclat || !data?.reclong) {
        setCountry("No location");
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${data.reclat}&lon=${data.reclong}&format=json&apiKey=1c6480fe81734704bb23de7a30a2a769`
        );
        if (isMounted) {
          setCountry(res?.data?.results?.[0]?.country || "Unknown");
        }
      } catch (err) {
        if (isMounted) setCountry("Unknown");
        console.error("Error fetching country:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    findCountry();

    return () => {
      isMounted = false; // cancel any state updates on unmount
    };
  }, [data]);

  return (
    <div className="w-full border-[1px] border-gray-300 flex p-5 rounded-md duration-100 hover:shadow-md">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center space-x-6 mb-4 justify-between">
          <h2 className="text-black text-3xl font-semibold">{data?.name || "Unknown"}</h2>
          <div className="w-[58px] bg-indigo-600 rounded-full h-[35px] flex items-center justify-center text-white font-semibold text-lg">
            {data?.id || "-"}
          </div>
        </div>

        {/* Details grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-x-6 gap-y-6">
          {/* Mass */}
          <div>
            <div className="flex items-center space-x-3">
              <FaWeightHanging className="text-gray-700" />
              <span className="text-gray-700">Mass</span>
            </div>
            <h3 className="font-semibold text-black text-md">{data?.mass ? `${data.mass}g` : "-"}</h3>
          </div>

          {/* Recclass */}
          <div>
            <div className="flex items-center space-x-3">
              <RxDashboard className="text-gray-700" />
              <span className="text-gray-700">Recclass</span>
            </div>
            <h3 className="font-semibold text-black text-md">{data?.recclass || "-"}</h3>
          </div>

          {/* Year */}
          <div>
            <div className="flex items-center space-x-3">
              <BsCalendar3 className="text-gray-700" />
              <span className="text-gray-700">Year</span>
            </div>
            <h3 className="font-semibold text-black text-md">
              {data?.year ? new Date(data.year).getFullYear() : "-"}
            </h3>
          </div>

          {/* Location */}
          <div>
            <div className="flex items-center space-x-3">
              <PiMapPinFill className="text-gray-700" />
              <span className="text-gray-700">Location</span>
            </div>
            {loading ? <Skeleton width={90} height={20} /> : <h3 className="font-semibold text-black text-md">{country}</h3>}
          </div>

          {/* Nametype */}
          <div>
            <div className="flex items-center space-x-3">
              <MdEditDocument className="text-gray-700" />
              <span className="text-gray-700">Nametype</span>
            </div>
            <div className="w-[75px] bg-[#2cbf2948] rounded-full h-[22px] flex items-center justify-center text-green-900 font-semibold text-md">
              {data?.nametype || "-"}
            </div>
          </div>

          {/* Fall */}
          <div>
            <div className="flex items-center space-x-3">
              <FaWind className="text-gray-700" />
              <span className="text-gray-700">Fall</span>
            </div>
            <h3 className="font-semibold text-black text-md">{data?.fall || "-"}</h3>
          </div>

          {/* Reclat */}
          <div>
            <div className="flex items-center space-x-3">
              <FaArrowsAltV className="text-gray-700" />
              <span className="text-gray-700">Reclat</span>
            </div>
            <h3 className="font-semibold text-black text-md">{data?.reclat || "-"}</h3>
          </div>

          {/* Reclong */}
          <div>
            <div className="flex items-center space-x-3">
              <FaArrowsAltH className="text-gray-700" />
              <span className="text-gray-700">Reclong</span>
            </div>
            <h3 className="font-semibold text-black text-md">{data?.reclong || "-"}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------- PROP TYPES --------------------
MeteoriteLine.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    mass: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    recclass: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    reclat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    reclong: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    nametype: PropTypes.string,
    fall: PropTypes.string,
  }).isRequired,
};
