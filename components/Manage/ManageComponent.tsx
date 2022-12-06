import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { BiTrash } from "react-icons/bi";

const ManageComponent = () => {
  const supabaseClient = createClient(
    process.env.apiURL!,
    process.env.apiServiceKey!
  );
  const [foundFiles, setFoundFiles] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  const availableColors = [
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
      value: "PINK"
    },
    {
      tag: "Grey",
      value: "GREY"
    }
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

  const setShapeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    window.localStorage.setItem('shape-color', e.target.value)
  };
  return (
    <>
      <div className="flex flex-row">
        {/* Remote file manager */}
        {(ready && (
          <div className="flex flex-col ml-2">
            <h1 className="font-semibold text-2xl mb-2">Manage Remote Files</h1>
            {foundFiles.map((file, index) => {
              return <ItemList key={index} item={file} />;
            })}
          </div>
        )) || <h1>Cargando</h1>}
        {/* Shape color Selector */}
        <div className="flex flex-col ml-10 w-52 h-20">
          <h1 className="font-semibold text-2xl mb-2">Shape color selection</h1>
          <select onChange={setShapeColor} name="Colors">
            <option value="none" selected disabled hidden>Select an option</option>
            {availableColors.map((color, index) => {
              return (
                <option key={index} value={color.value}>
                  {color.tag}
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
        onClick={() => {
          deleteFile(item);
        }}
      />
    </div>
  );
};

export default ManageComponent;
