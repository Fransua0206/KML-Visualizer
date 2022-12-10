import React, { ReactElement } from "react";
import { MdUploadFile } from 'react-icons/md'
import { BiCog } from "react-icons/bi";
import { GiWorld } from "react-icons/gi";
import Link from "next/link";

const iconProps = {
  size: 40,
  color: "white",
};

const Sidebar = () => {
  return (
    <div className="flex w-16 bg-black justify-start items-center p-2 flex-col">
      <SidebarIcon icon={<GiWorld {...iconProps} />} link="/" />
      <SidebarIcon icon={<MdUploadFile {...iconProps} />} link="/upload" />
      <SidebarIcon icon={<BiCog {...iconProps} />} link="/manage" />
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
