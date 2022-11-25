import React, { useRef } from "react";
import { AiFillFileAdd } from "react-icons/ai";

interface Props {
    mapFiles: Array<any>
}

const Siedbar = ({ mapFiles }: Props) => {
    const fileInput = useRef(null)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0]
            mapFiles.push(i)
            console.log(mapFiles)
        }
    }
  return (
    <div className="w-20 h-full bg-green-700 flex flex-col items-center justify-start">
      <input type={"file"} ref={fileInput} onChange={handleChange} accept="application/vnd.google-earth.kml+xml" />
    </div>
  );
};

export default Siedbar;
