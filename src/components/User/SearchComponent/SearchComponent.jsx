import { useEffect, useState } from "react";
import { Label } from "../../UI/Label";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { BsSearch } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";
import { useApiContext } from "../../../contexts/APIcontext";

export const SearchComponent = () => {
  const { meteoriteData, setFilteredSearchInput } = useApiContext();

  const [inputAttributes, setInputAttributes] = useState({
    id: "name",
    name: "name",
    placeholder: "Search by meteor name (Ex: Aarhus)",
  });

  const [searchInputValue, setSearchInputValue] = useState({
    name: "",
    year: "",
    composition: "",
    mass: "",
  });

  const [isDefaultSearchOption, setIsDefaultSearchOption] = useState(true);
  const [currentInputValue, setCurrentInputValue] = useState("");

  // Filter data whenever input changes
  useEffect(() => {
    let filtered = meteoriteData;

    if (searchInputValue.name) {
      filtered = filtered.filter((m) =>
        m.name?.toLowerCase().includes(searchInputValue.name.toLowerCase())
      );
    }
    if (searchInputValue.year) {
      filtered = filtered.filter((m) =>
        m.year ? new Date(m.year).getFullYear().toString().includes(searchInputValue.year) : false
      );
    }
    if (searchInputValue.composition) {
      filtered = filtered.filter((m) =>
        m.recclass?.toLowerCase().includes(searchInputValue.composition.toLowerCase())
      );
    }
    if (searchInputValue.mass) {
      filtered = filtered.filter((m) =>
        m.mass ? (m.mass / 1000).toString().includes(searchInputValue.mass) : false
      );
    }

    setFilteredSearchInput(filtered);
  }, [
    meteoriteData,
    searchInputValue.name,
    searchInputValue.year,
    searchInputValue.composition,
    searchInputValue.mass,
    setFilteredSearchInput,
  ]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setSearchInputValue((prev) => ({ ...prev, [id]: value }));
    setCurrentInputValue(value);
  };

  const clearSearchInputValue = () => {
    setSearchInputValue({
      name: "",
      year: "",
      composition: "",
      mass: "",
    });
    setCurrentInputValue("");
    setIsDefaultSearchOption(true);
  };

  const inputAttributesSwitch = (type) => {
    switch (type) {
      case "name":
        return {
          id: "name",
          name: "name",
          placeholder: "Search by meteor name (Ex: Aarhus)",
        };
      case "year":
        return {
          id: "year",
          name: "year",
          placeholder: "Search by meteor year of strike (Ex: 1880)",
        };
      case "composition":
        return {
          id: "composition",
          name: "composition",
          placeholder: "Search by meteorite composition (Ex: 'Iron' or 'H4')",
        };
      case "mass":
        return {
          id: "mass",
          name: "mass",
          placeholder: "Search by meteorite mass range (kg) (Ex: 1.44)",
        };
      default:
        return inputAttributes;
    }
  };

  // Input type switch handlers
  const handleInputSwitch = (type) => {
    setIsDefaultSearchOption(type === "name");
    setInputAttributes(inputAttributesSwitch(type));
    setCurrentInputValue(searchInputValue[type]);
  };

  return (
    <section className="flex flex-col justify-between">
      <form
        className="flex flex-col space-y-3 mt-1 px-6 pt-6 md:flex-row md:space-x-6 md:space-y-0 md:pt-8"
        onSubmit={handleOnSubmit}
      >
        <section className="relative flex-1 justify-center">
          <Label className="sr-only" text="Search" />
          <span className="absolute top-[32%] left-[4%] md:left-[5%] lg:left-[3%]">
            <BsSearch style={{ color: "rgb(99 102 241)", height: "20px", width: "20px" }} />
          </span>
          <Input
            type="text"
            {...inputAttributes}
            value={currentInputValue}
            onChange={handleOnChange}
            required
            className="p-4 pl-12 pr-14 text-md text-slate-800 rounded-lg bg-white placeholder-gray-400 shadow-md shadow-indigo-200 w-full focus:ring-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 md:text-lg md:pl-16 md:pr-12 lg:pl-16 lg:pr-20"
          />
          <span
            className="absolute top-[24%] right-[5%] lg:right-[3%] cursor-pointer"
            onClick={clearSearchInputValue}
          >
            <IoCloseCircle style={{ color: "rgb(99 102 241)", height: "30px", width: "30px" }} />
          </span>
        </section>

        <Button
          type="submit"
          text="Search"
          className="text-md text-slate-100 font-semibold rounded-full py-3 bg-indigo-700 border-indigo-700 hover:bg-indigo-600 focus:ring-2 focus:outline-none focus:ring-indigo-900 focus:bg-indigo-200 focus:text-slate-800 md:px-8 md:py-4"
        />
      </form>

      <section className="flex flex-wrap justify-center gap-2 p-4 text-md font-semibold text-indigo-800 md:pl-6 md:justify-start md:pt-6">
        <Button
          text="Name"
          type="button"
          onClick={() => handleInputSwitch("name")}
          className={`border-2 border-indigo-400 rounded-md px-6 py-1 mt-3 hover:bg-gray-100 hover:text-slate-800 hover:border-indigo-900 focus:ring-2 focus:outline-none focus:ring-indigo-900 focus:text-slate-800 focus:bg-indigo-200 md:mt-0 ${isDefaultSearchOption ? "bg-indigo-200 border-indigo-900 text-slate-900" : ""
            }`}
        />
        <Button
          text="Year of strike"
          type="button"
          onClick={() => handleInputSwitch("year")}
          className="border-2 border-indigo-400 rounded-md px-6 py-1 mt-3 hover:bg-gray-100 hover:text-slate-800 hover:border-indigo-900 focus:ring-2 focus:outline-none focus:ring-indigo-900 focus:text-slate-800 focus:bg-indigo-200 md:mt-0"
        />
        <Button
          text="Meteorite Composition"
          type="button"
          onClick={() => handleInputSwitch("composition")}
          className="border-2 border-indigo-400 rounded-md px-6 py-1 mt-3 hover:bg-gray-100 hover:text-slate-800 hover:border-indigo-900 focus:ring-2 focus:outline-none focus:ring-indigo-900 focus:text-slate-800 focus:bg-indigo-200 md:mt-0"
        />
        <Button
          text="Mass range"
          type="button"
          onClick={() => handleInputSwitch("mass")}
          className="border-2 border-indigo-400 rounded-md px-6 py-1 mt-3 hover:bg-gray-100 hover:text-slate-800 hover:border-indigo-900 focus:ring-2 focus:outline-none focus:ring-indigo-900 focus:text-slate-800 focus:bg-indigo-200 md:mt-0"
        />
      </section>
    </section>
  );
};
