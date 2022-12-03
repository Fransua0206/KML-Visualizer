import Head from "next/head";
import MapComponent from "../components/Map/Map";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Home() {
  return (
    <>
    <Head>
      <title>KML Visualizer</title>
    </Head>
      <section className="flex flex-row w-full h-screen overflow-hidden">
        <Sidebar />
        <MapComponent />
      </section>
    </>
  );
}
