import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table({ countries, data, fromFull }) {
  console.log(" this is the data in the table",data)
  return (
    <div className={`table ${ fromFull && data.length === 0 && "tablewithout" }` }>
      {countries.map((country) => (
        <tr>
          <td>{country.country}</td>
          <td>
            <strong>{numeral(country.cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
