import { NextPage } from "next";
import Sidebar from "../../components/Sidebar/Sidebar";
import UploadComponent from "../../components/Upload/UploadComponent";

interface Props {}

const UploadPage: NextPage<Props> = ({}) => {
  return (
    <section className="flex flex-row w-full h-screen overflow-hidden">
        <Sidebar />
        <UploadComponent />
    </section>
  );
};

export default UploadPage;
