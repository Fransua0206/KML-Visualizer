import Head from "next/head";
import Image from "next/image";
import MapComponent from "../components/Map";
import Siedbar from "../components/Siedbar";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const [mapFiles, setMapFiles] = useState([]);
  return (
    <section className="flex flex-row w-full h-screen overflow-hidden">
      {/* <Siedbar mapFiles={mapFiles} /> */}
      <MapComponent mapFiles={mapFiles} />
    </section>
  );
}