import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";

export const styleFunction = (feature: any) => {
  let style = new Style({
    stroke: new Stroke({
      color: "rgb(123, 154, 175)",
      width: 1,
    }),
    fill: new Fill({
      color: "rgba(123, 154, 175, 0.2)",
    }),
  });
  return [style];
};
