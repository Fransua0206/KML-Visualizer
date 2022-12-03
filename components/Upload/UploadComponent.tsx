import React, { useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const UploadComponent = () => {
  const fileInput = useRef(null);
  const [file, setFile] = useState<File | null>();
  const [uploadError, setUploadError] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);

  // Supabase Init
  const supabaseClient = createClient(
    process.env.apiURL!,
    process.env.apiServiceKey!
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const uploadFile = async () => {
    const { data, error } = await supabaseClient.storage
      .from("kml")
      .upload(`${file?.name}`, file!, {
        upsert: true,
      });

    if (error) {
      setUploadError(true);
      console.log(error);
      setFile(null);
    }

    setHasUploaded(true);
    setFile(null);
  };
  return (
    <section className="flex flex-col">
      <input
        type={"file"}
        ref={fileInput}
        onChange={handleChange}
        accept=".kml"
      />
      {file && (
        <>
          <h1>{file.name} esta listo para ser subido al servidor!</h1>
          <button
            className="bg-green-600 w-36 rounded-xl p-2"
            onClick={uploadFile}
          >
            Subir Archivo
          </button>
          {uploadError && (
            <h2 className="text-red-600 font-bold">
              Hubo un error al subir el archivo, por favor revisa la consola.
            </h2>
          )}
        </>
      )}
      {hasUploaded && (
        <h2 className="text-green-600 font-bold">
          Archivo cargado exitosamente!
        </h2>
      )}
    </section>
  );
};

export default UploadComponent;
