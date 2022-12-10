import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { BiTrash } from "react-icons/bi";

interface SelectProps {
  tag: string;
  value: string;
}

const ManageComponent = () => {
  const supabaseClient = createClient(
    process.env.apiURL!,
    process.env.apiServiceKey!
  );
  const [foundFiles, setFoundFiles] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  const availableColors: SelectProps[] = [
    {
      tag: "Red",
      value: "RED",
    },
    {
      tag: "Blue",
      value: "BLUE",
    },
    {
      tag: "Pink",
      value: "PINK",
    },
    {
      tag: "Grey",
      value: "GREY",
    },
  ];

  const availableMaps: SelectProps[] = [
    {
      tag: "Argenmap",
      value:
        "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png",
    },
    {
      tag: "Argenmap (gris)",
      value:
        "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_gris@EPSG%3A3857@png/{z}/{x}/{-y}.png",
    },
    {
      tag: "Argenmap (topográfico)",
      value:
        "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_topo@EPSG%3A3857@png/{z}/{x}/{-y}.png",
    },
    {
      tag: "Argenmap (oscuro)",
      value:
        "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/argenmap_oscuro@EPSG%3A3857@png/{z}/{x}/{-y}.png",
    },
  ];

  useEffect(() => {
    const getData = async () => {
      console.log("Running getData");
      const response = await supabaseClient.storage.from("kml").list();
      console.log("Got response");
      await response.data?.forEach((file) => {
        if (file.name.endsWith(".kml") && !foundFiles.includes(file.name)) {
          foundFiles.push(file.name);
        }
      });
      setReady(true);
    };

    getData();
  }, []);

  // Localstorage functions
  const setShapeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    window.localStorage.setItem("shape-color", e.target.value);
  };
  const setMapStyle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    window.localStorage.setItem("map-style", e.target.value);
  };
  return (
    <>
      <div className="flex flex-col ml-2 md:flex-row">
        {/* Remote file manager */}
        {(ready && (
          <div className="flex flex-col w-72 h-fit p-2">
            <h1 className="font-semibold text-2xl mb-2">Manage Remote Files</h1>
            {foundFiles.map((file, index) => {
              return <ItemList key={index} item={file} />;
            })}
          </div>
        )) || <h1>Cargando</h1>}
        {/* Shape color Selector */}
        <div className="flex flex-col ml-2 mt-5 w-72 h-fit p-2 md:ml-10 md:mt-0">
          <h1 className="font-semibold text-2xl mb-2">Shape color selection</h1>
          <select onChange={setShapeColor} name="Colors">
            <option value="none" selected disabled hidden>
              Select an option
            </option>
            {availableColors.map((color, index) => {
              return (
                <option key={index} value={color.value}>
                  {color.tag}
                </option>
              );
            })}
          </select>
        </div>
        {/* Map style selector */}
        <div className="flex flex-col ml-2 mt-5 w-72 h-fit p-2 md:ml-10 md:mt-0">
          <h1 className="font-semibold text-2xl mb-2">Map style selector</h1>
          <select onChange={setMapStyle} name="Map">
            {/* Placeholder */}
            <option value="none" selected disabled hidden>
              Select an option
            </option>
            {/* Options mapping */}
            {availableMaps.map((map, index) => {
              return (
                <option key={index} value={map.value}>
                  {map.tag}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
};

interface ItemProps {
  item: string;
}

const ItemList = ({ item }: ItemProps) => {
  const supabaseClient = createClient(
    process.env.apiURL!,
    process.env.apiServiceKey!
  );

  const deleteFile = async (file: string) => {
    await supabaseClient.storage.from("kml").remove(Array(file));
    window.location.reload();
  };
  return (
    <div className="flex flex-row items-center justify-start mt-5">
      <h2 className="text-xl font-bold">{item}</h2>
      <BiTrash
        className="ml-2 hover:cursor-pointer"
        size={40}
        color="#E93434"
        onClick={() => {
          deleteFile(item);
        }}
      />
    </div>
  );
};

export default ManageComponent;
