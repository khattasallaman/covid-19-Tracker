import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, cases, total, active, isRed, isGreen, isBlue, ...props }) {
  console.log(title, active);
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      } ${isBlue && "infoBox--blue"}`}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography className={`infoBox__cases ${isGreen ? "infoBox__cases--green" : isBlue && "infoBox__cases--blue"}`}>
          Today : {cases}
        </Typography>

        <Typography className="infoBox__total" color="textSecondary">
        Total : {total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
