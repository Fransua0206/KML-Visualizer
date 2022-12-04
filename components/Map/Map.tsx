import React, { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import "ol/ol.css";
import { View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import KML from "ol/format/KML";
import {
  centerSyle as centerStyle,
  towerStyle,
  departureStyle,
  approachStyle,
  centerSyle,
} from "../../tools/MapTools";
import { createClient } from "@supabase/supabase-js";

const MapComponent = () => {
  const [ready, setReady] = useState(false);
  const [map, setMap]: any = useState();
  const mapElement: any = useRef();
  const mapRef: any = useRef();
  mapRef.current = map;
  let initialMap: Map;
  const [foundKML, setFoundKML] = useState<string[]>([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    setReady(false);
    const supabaseClient = createClient(
      process.env.apiURL!,
      process.env.apiServiceKey!
    );

    const getData = async () => {
      const response = await supabaseClient.storage.from("kml").list();
      await response.data?.forEach((file) => {
        if (file.name.endsWith(".kml") && !foundKML.includes(file.name)) {
          foundKML.push(file.name);
        }
      });
      setReady(true);
    };

    getData();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/argenmap_oscuro@EPSG%3A3857@png/{z}/{x}/{-y}.png",
          }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
    });
    foundKML.forEach((file) => {
      const vectorSource = new VectorSource({
        url: `https://tlhxyerrkkdhbicmshta.supabase.co/storage/v1/object/public/kml/${file}`,
        format: new KML({
          extractStyles: false,
        }),
      });
      initialMap.addLayer(
        new VectorLayer({
          source: vectorSource,
          style: departureStyle,
        })
      );
    });
    setMap(initialMap);
  }, [ready]);

  return (
    <div
      style={{ height: "100vh", width: "100%" }}
      ref={mapElement}
      className="map-container"
    />
  );
};

export default MapComponent;
