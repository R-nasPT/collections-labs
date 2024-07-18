import React from 'react';
import { MdKeyboardArrowDown, MdPlus } from "react-icons/md";
import { Mdq } from "react-icons/md";

interface IconProps {
  open: boolean;
}

export const ArrowIcon: React.FC<IconProps> = ({ open }) => (
  <MdKeyboardArrowDown
    className={`w-6 h-6 transition-transform duration-300 ${
      open ? "rotate-180" : ""
    }`}
  />
);

export const PlusIcon: React.FC<IconProps> = ({ open }) => (
  <MdPlus
    className={`w-6 h-6 transition-transform duration-300 ${
      open ? "rotate-180" : ""
    }`}
  />
);

export const WertyIcon: React.FC<IconProps> = ({ open }) => (
  <>
    werty <Mdq
      className={`w-6 h-6 transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
    />
  </>
);
