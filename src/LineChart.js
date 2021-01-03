import React from 'react'
import CanvasJSReact from './canvasjs/canvasjs.react';
import Line from './GlobalLine';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

CanvasJS.addColorSet("colors",
[
"#7f7fff",
"#a1d350",
"#e2423f",
]);



export default function LineChart({cases, deaths, recovered, country}) {

   

    const options = {
        theme: "light2",

        title: {
          text: `Covid-19 cases ${country ? "in " + country : "worldwide"}`,
          margin:20,
          horizontalAlign: "left",
          fontSize: 22,
          fontWeight: "normal",
          fontFamily: "tahoma", 
          padding: 7, 

        },
        colorSet: "colors",
        data: [{				
                  type: "column",
                  dataPoints: [
                      { label: "Total cases",  y: cases},
                      { label: "Recovered", y: recovered},
                      { label: "Deaths", y: deaths},
                  ]
         }]
     }
   
  
    return (
        <div>
            {!country  ? <Line/> :
             <CanvasJSChart options = {options}
        />}

        </div>
    )
}
