import React, { ReactElement } from "react";
import { FiUpload } from "react-icons/fi";
import { TbWorld } from "react-icons/tb";
import Link from "next/link";
import { IconType } from "react-icons";

const iconProps = {
  size: 40,
  color: "white",
};

const Sidebar = () => {
  return (
    <div className="flex w-16 bg-blue-900 justify-start items-center p-2 flex-col">
      <SidebarIcon icon={<TbWorld {...iconProps} />} link="/" />
      <SidebarIcon icon={<FiUpload {...iconProps} />} link="/upload" />
    </div>
  );
};

interface IconProps {
  link: string;
  icon: ReactElement;
}
const SidebarIcon = ({ icon, link }: IconProps) => {
  return (
    <div className="p-4">
      <Link href={link}>{icon}</Link>
    </div>
  );
};

export default Sidebar;
