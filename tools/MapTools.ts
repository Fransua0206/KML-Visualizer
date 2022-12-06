import { Geometry } from "ol/geom";
import VectorSource from "ol/source/Vector";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";

const fillOpacity = "0.2";

export const getStyle = (feature: any) => {
  const selectedColor = window.localStorage.getItem("shape-color");

  switch (selectedColor) {
    case "RED":
      let redStyle = new Style({
        stroke: new Stroke({
          color: "rgb(255, 87, 81)",
          width: 1,
        }),
        fill: new Fill({
          color: `rgba(255, 87, 81, ${fillOpacity})`,
        }),
      });
      return [redStyle];
    case "BLUE":
      let blueStyle = new Style({
        stroke: new Stroke({
          color: "rgb(112, 165, 236)",
          width: 1,
        }),
        fill: new Fill({
          color: `rgba(112, 165, 236, ${fillOpacity})`,
        }),
      });
      return [blueStyle];
    case "PINK":
      let pinkStyle = new Style({
        stroke: new Stroke({
          color: "rgb(255, 204, 255)",
          width: 1,
        }),
        fill: new Fill({
          color: `rgba(255, 204, 255, ${fillOpacity})`,
        }),
      });
      return [pinkStyle];
    case "GREY":
      let grayStyle = new Style({
        stroke: new Stroke({
          color: "rgb(123, 154, 175)",
          width: 1,
        }),
        fill: new Fill({
          color: `rgba(123, 154, 175, ${fillOpacity})`,
        }),
      });
      return [grayStyle];
    default:
      let defaultStyle = new Style({
        stroke: new Stroke({
          color: "rgb(255, 204, 255)",
          width: 1,
        }),
        fill: new Fill({
          color: `rgba(255, 204, 255, ${fillOpacity})`,
        }),
      });
      return [defaultStyle];
  }
};
