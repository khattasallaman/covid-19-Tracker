import React, { useState, useEffect } from 'react';
import CanvasJSReact from './canvasjs/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;



function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
 
const Line = () => {
    const [data, setData] = useState({});

    const prepare = (data) => {
        console.log("we areeeeee iiiinnnnnn")
        let readayData = {}
        const entries = Object.entries(data)
        readayData = entries.map((entry) => ({x: new Date(entry[0]), y:entry[1]}))
        console.log("the data for everyyyyyyyyyyyyyyy ", readayData)
        return readayData
    }

    useEffect(() => {
        const fetchData = async () => {
          await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=400")
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log("the data in the line Linnnnneeeeeeee    ", data)
              setData(data);
              // buildChart(chartData);
            });
        };
    
        fetchData();
      }, []);

        const toogleDataSeries = (e) =>{
            if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            } else{
                e.dataSeries.visible = true;
            }
        }
        const cases =  isEmpty(data) === false  ? prepare(data.cases) : []
        const deaths =  isEmpty(data) === false  ? prepare(data.deaths) : []
        const recovered =  isEmpty(data) === false  ? prepare(data.recovered) : []

		const options = {
            animationEnabled: true,
            theme: "light2",

			title: {
                text: "Worldwide Cases",
                // margin:17,
                // margin:25,
                horizontalAlign: "left",
                fontSize: 22,
                fontWeight: "normal",
                fontFamily: "tahoma", 
                padding: 10, 
            },
            axisX: {
                valueFormatString: "DD MMM",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }   
            },
            axisY2: {
                // title: "",
                // prefix: "$",
                // suffix: "K"
                includeZero: true,
		crosshair: {
			enabled: true
		}
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                verticalAlign: "top",
                horizontalAlign: "center",
                dockInsidePlotArea: true,
                itemclick: toogleDataSeries
            },
            data: [{
                type:"line",
                axisYType: "secondary",
                name: "cases",
                showInLegend: true,
                // markerSize: 0,
                yValueFormatString: "#,###",
                dataPoints: cases,
                color: "#7f7fff",

            },
            {
                type: "line",
                axisYType: "secondary",
                name: "deaths",
                showInLegend: true,
                // markerSize: 0,
                yValueFormatString: "#,###",
                dataPoints: deaths,
                color: "#FF0000",
                
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "recovered",
                showInLegend: true,
                // markerSize: 0,
                yValueFormatString: "#,###",
                dataPoints: recovered,
                color: "#92d820",

            }
            ]
        }
        
		
		return (
		<div style={{}}>
                    {/* <h1 style={{fontSize:"25px", paddingLeft: "10px", paddingTop:"10px" ,}} className="heading">Cases Worldwide</h1> */}

			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
}

export default Line;                           