import { useEffect, useState } from "react";

export default function Country({ selectedCountry, onCountryChange }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-name.json"
      );
      const data = await response.json();

      if (active) {
        setCountries(data);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <label htmlFor="country">Country:</label>
      <select
        className="form-select"
        name="country"
        value={selectedCountry}
        onChange={(e) => onCountryChange(e.target.value)}
      >
        <option
          value="none"
          defaultValue="Select a country"
          disabled
          hidden
        >
          Select a country
        </option>
        {countries.map((c, index) => {
          return (
            <option
              key={index}
              value={c.country}
            >
              {c.country}
            </option>
          );
        })}
      </select>
    </>
  );
}
