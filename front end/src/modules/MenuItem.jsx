import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
const MenuItem = ({menuItem}) => {
    const [subMenu,setSubMenu]=useState(false)
    const [activemenu,setActiveMenu]=useState(false)
    const menuRef=useRef()
    useEffect(()=>{
        const closeMenu=e=>{
            if(!menuRef.current.contains(e.target)){
                setSubMenu(false);
               
            }
      
        }
        document.addEventListener('mousedown',closeMenu)
        return ()=>document.removeEventListener('mousedown',closeMenu);
    },[])
    return (
      
        <ul className={`   font-semibold relative ` } ref={menuRef}>
            <li className={` px-2 py-2 rounded-md`}>
                <button onClick={()=>setSubMenu(!subMenu)} className={`flex px-2 justify-between w-full items-center gap-3 py-2 text-sm  `}>
                 
                   
                    {menuItem.title}
                  
                   
                    </button>

                    {/* Sub menu */}
                <ul className={`${!subMenu && `hidden` }    min-h-7 px-5 absolute  z-50 bg-white rounded-md shadow-lg text-xs  w-max py-3`}>
                {menuItem.subMenus && menuItem.subMenus.map((item,index)=>(
                
                        <li key={index} className={`py-2 px-2 text-gray-600`}>
                        
                          {item.title}
                            </li>
                ))}
                </ul>
            </li>

        </ul>
        
         
         
    
         
       
       
    );
};

export default MenuItem;