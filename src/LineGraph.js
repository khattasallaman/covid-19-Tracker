import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { Card, CardContent } from "@material-ui/core";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
        gridLines: {
          display: true,
      } 
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
          drawBorder: false,
          tickMarkLength: false,
        },
        margin:10,
        ticks: {
          padding: 4,
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  if(data){
    // setAppData(data)
      for (let date in data.cases) {
        if (lastDataPoint) {
          let newDataPoint = {
            x: date,
            y: data[casesType][date] - lastDataPoint,
          };
          chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
      }
  }
  return chartData;
};

function LineGraph({ casesType, color , country, setAppData, fromFull}) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`https://disease.sh/v3/covid-19/historical/${country !== "worldwide" ?country :"all"}?lastdays=120`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("the data in the line graphhhhhh    ", data)
          const passedData = country !== "worldwide" ? data.timeline : data
          let chartData = buildChartData(passedData, casesType);
          (fromFull && passedData) ? setAppData(passedData) : (fromFull && passedData) && setAppData([])
          setData(chartData);
          console.log(chartData);
          // buildChart(chartData);
        });
    };

    fetchData();
  }, [casesType, country]);

  return (
      data.length > 0 ?
      <Card style={{marginTop:"10px"}}>
        <div style={{fontSize:"25px", paddingLeft: "10px", paddingTop:"10px" ,}}>{country} new {casesType}</div>
        {/* <Card> */}
            <CardContent>
              <Line
                data={{
                  datasets: [
                    {
                      backgroundColor: casesType === "deaths" ? "rgba(255, 0, 0, 0.5)" : casesType === "recovered" ? "rgba(0, 255, 0, 0.5)" : "rgba(0, 0, 255, 0.5)",
                      borderColor: color,
                      data: data,
                    },
                  ],
                }}
                options={options}
              />
            </CardContent>
          
        {/* </Card> */}
      </Card>
    : <div>

    </div>

  );
}

export default LineGraph;
