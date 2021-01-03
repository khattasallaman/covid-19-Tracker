import React from 'react'
import CanvasJSReact from './canvasjs/canvasjs.react';
import {rounding} from "./util"
import numeral from "numeral";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

CanvasJS.addColorSet("colors",
[
"#7f7fff",
"#a1d350",
"#e2423f",
]);

export default function PieChar (props) {

        const {cases:{deaths, recovered, cases}, country, appData, fromFull} = props
        const total = deaths + recovered + cases
        const deathsPer =  Math.floor((deaths/cases) * 100)
        
        // const deathsPer = Math.round((deaths/cases) * 100)
        const recoveredPer = Math.ceil((recovered/cases) * 100) 
        // const recoveredPer = Math.round((recovered/cases) * 100)
        const activePer = Math.ceil(((cases - deaths - recovered)/cases) * 100) 
        console.log("the deathsPer ", deathsPer)
        // const activePer = Math.round((cases/cases) * 100)
        const data = [{y:activePer, label:"currently active", cases:numeral(cases - deaths - recovered).format("0.0a")}, {y:deathsPer, label:"deaths", cases:numeral(deaths).format("0.0a")}, {y:recoveredPer, label:"recovered", cases:numeral(recovered).format("0.0a")}]
        console.log("this is tha dataaaaa    ", data)
        const newOptions = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
                text: `Percentages related to total cases ${country ?"in "+ country : "worldwide"}`,
                // margin:17,
                margin:25,
                marginTop:20,
                horizontalAlign: "left",
                fontSize: 22,
                fontWeight: "normal",
                fontFamily: "tahoma", 
                padding: 10, 
            },
            legend:{
                markerMargin: 10,
                verticalAlign: "top"
               },
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b classname='text-wrap'>{cases} {label}</b>",
				showInLegend: "true",
                legendText: "{label}",
                indexLabelPlacement: "outside",
				indexLabelFontSize: 16,
				indexLabel: "{y} %",
				dataPoints: data
			}]
		}

       
        return (

                <div className={`${fromFull && appData.length === 0 && "pieWithout"}`}>
                   <CanvasJSChart options = {newOptions} />
                 </div>

        )
}

