import React from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import { prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import LineChart from "./LineChart";
import PieChar from "./PieChar";
import Footer from "./Footer";

const SmallScreeApp = ({country, cName, countryInfo, countries, mapCountries, tableData, casesType, setCasesType, mapCenter, onCountryChange, mapZoom}) => {

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h3 className="heading">COVID-19 Tracker</h3>
          
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.name}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__information">
        <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
        </div>
        {/* <div style={{fontSize:"19px", marginTop:"25px"}}>Covid Data {country !== "worldwide" ? "in " + country :"Worldwide"}</div>  */}
        
       
        <div style={{marginTop:"18px", marginBottom:"8px"}}>
          <LineChart cases={countryInfo.cases} deaths={countryInfo.deaths} recovered={countryInfo.recovered} country={countryInfo.country}/>

        </div>
      </div>
      <div style={{marginTop:"20px"}}>
              <PieChar cases={{deaths:countryInfo.deaths, recovered:countryInfo.recovered, cases:countryInfo.cases}} country={countryInfo.country}/>
            </div>
            <div className="app__stats_small">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Active Cases"
            isBlue
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            isGreen
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>
      {/* <Card style={{marginTop:"15px"}}>
        <CardContent>
          <div className="app__information"> */}
            {/* <h3>{cName} new {casesType}</h3> */}
            <LineGraph casesType={casesType} color={casesType === "cases" ? "#7f7fff" : casesType === "recovered" ? "#a1d350" : "#ff0000"} country={cName}/>
          
          {/* </div>
        </CardContent>
      </Card> */}
      <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
    </div>
  );
};

export default SmallScreeApp;
