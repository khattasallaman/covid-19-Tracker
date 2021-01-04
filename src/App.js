import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import LineChart from "./LineChart";
import PieChar from "./PieChar";
import SmallScreeApp from "./SmallScreeApp";
import useWindowDimensions from "./size";
import Footer from "./Footer";

const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [cName, setCName] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [appData, setData] = useState([])
  const { width } = useWindowDimensions();


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          console.log("this is the dataaaaa  from khata  ", data)
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  console.log(casesType);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCName(countryCode)
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log("this is the dataaaaa  from khata  ", data)
        setInputCountry(countryCode);
        // const newData = countryCode === "worldwide" ? data : data.countryInfo
        setCountryInfo(data);
        countryCode !== "worldwide" && setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    width > 1000 ?
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1 className="heading">COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide"  >Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.name}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
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
        <div style={{marginTop:"12px", marginBottom:"8px"}}>
          <LineChart cases={countryInfo.cases} deaths={countryInfo.deaths} recovered={countryInfo.recovered} country={countryInfo.country}/>

        </div>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <div>
        <Card className="app__right">
          <CardContent>
            <div className="app__information">
              <h3>Live Cases by Country</h3>
              <Table fromFull data={appData} countries={tableData} />
            </div>
          </CardContent>
        </Card>
        {/* <Card style={{marginTop:"13px"}}>
          <CardContent> */}
              {/* <h3>{cName} new {casesType}</h3> */}
              <LineGraph fromFull setAppData={setData} casesType={casesType} color={casesType === "cases" ? "#7f7fff" : casesType === "recovered" ? "#a1d350" : "#ff0000"} country={cName}/>
          {/* </CardContent>
        </Card> */}
        <div style={{marginTop:"13px"}}>
                <PieChar fromFull appData={appData} cases={{deaths:countryInfo.deaths, recovered:countryInfo.recovered, cases:countryInfo.cases}} country={countryInfo.country}/>
          </div>
      </div>
    </div>

    : <SmallScreeApp country={country} cName={cName} setCName={setCName} countryInfo={countryInfo} countries={countries} mapCountries={mapCountries} tableData={tableData}  casesType={casesType} setCasesType={setCasesType} mapCenter={mapCenter} mapZoom={mapZoom} onCountryChange={onCountryChange}/>
  );
};

export default App;
