import React from 'react';
import { FaUser } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { CgInsertAfterO } from "react-icons/cg";
import { TbDoorExit } from "react-icons/tb";
import { TbDoorEnter } from "react-icons/tb";
const QuicMenu = () => {
    return (
        <div  className='bg-gray-100 border-b-2 shadow-sm px-4'>
        <ul className='flex *:p-4 *:cursor-pointer '>
          <li><FaUser size={25}/></li>
          <li><FaBoxOpen size={25}/></li>
          <li><TbDoorEnter size={25}/></li>
          <li><TbDoorExit size={25}/></li>
        
        </ul>
      </div>
    );
};

export default QuicMenu;