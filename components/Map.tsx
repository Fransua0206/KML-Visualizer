import React, { useState, useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import GeoJSON from "ol/format/GeoJSON";
import KML from "ol/format/KML";
import VectorSource, { VectorSourceEvent } from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import XYZ from "ol/source/XYZ";
import TileJSON from 'ol/source/TileJSON'
import { styleFunction } from "../tools/MapTools";

interface Props {
  mapFiles: Array<any>;
}

const MapComponent = ({ mapFiles }: Props) => {
  const [map, setMap]: any = useState();
  const mapElement: any = useRef();
  const mapRef: any = useRef();
  mapRef.current = map;
  let initialMap: Map;

  const norhtSource = new VectorSource({
    url: "./SAVF_N_CTR.kml",
    format: new KML({
      extractStyles: false,
    }),
  });
  const northLayer = new VectorLayer({
    source: norhtSource,
    style: styleFunction,
  });
  const southSource = new VectorSource({
    url: "./SAVF_S_CTR.kml",
    format: new KML({
      extractStyles: false,
    }),
  });
  const southLayer = new VectorLayer({
    source: southSource,
    style: styleFunction,
  });

  //
  const airSource = new VectorSource({
    url: "./FronteraAerea.kml",
    format: new KML({
      extractStyles: false,
    }),
  });
  const airLayer = new VectorLayer({
    source: airSource,
    style: styleFunction,
  });

  useEffect(() => {
    initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new TileJSON({
            url: "https://maps.ivao.aero/styles/hybrid.json",
          }),
        }),
        northLayer,
        southLayer,
        // airLayer
      ],
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
    });
    // setInterval(() => {
    //   mapFiles.forEach((file) => {
    //     const reader = new FileReader();
    //     reader.onload = function () {
    //       const vector = new VectorLayer({
    //         source: new VectorSource({
    //           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //           // @ts-ignore
    //           url: reader.result,
    //           format: new KML(),
    //         }),
    //       });
    //       initialMap.addLayer(vector);
    //     };
    //     reader.readAsDataURL(file);
    //   });
    // }, 5000);
    setMap(initialMap);
  }, []);

  return (
    <div
      style={{ height: "100vh", width: "100%" }}
      ref={mapElement}
      className="map-container"
    />
  );
};

export default MapComponent;

// // SAEF
// const saefSource = new VectorSource({
//   format: new KML({
//     extractStyles: false,
//   }),
//   url: "./SAEF.kml",
// });
// const saefLayer = new VectorLayer({
//   source: saefSource,
//   style: styleFunction,
// });

// // SAVF
// const savfSource = new VectorSource({
//   format: new KML({
//     extractStyles: false,
//   }),
//   url: "./SAVF.kml",
// });
// const savfLayer = new VectorLayer({
//   source: savfSource,
//   style: styleFunction,
// });

// // SAMF
// const samfSource = new VectorSource({
//   format: new KML({
//     extractStyles: false
//   }),
//   url: './SAMF.kml'
// })
// const samfLayer = new VectorLayer({
//   source: samfSource,
//   style: styleFunction
// })

// // SACF
// const sacfSource = new VectorSource({
//   format: new KML({
//     extractStyles: false
//   }),
//   url: './SACF.kml'
// })
// const sacfLayer = new VectorLayer({
//   source: sacfSource,
//   style: styleFunction
// })

// // SARR
// const sarrSource = new VectorSource({
//   format: new KML({
//     extractStyles: false
//   }),
//   url: './SARR.kml'
// })
// const sarrLayer = new VectorLayer({
//   source: sarrSource,
//   style: styleFunction
// })
