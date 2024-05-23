import React, { Children, useEffect, useRef } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
const Modal = ({children ,setModal,savePeople}) => {

    const handleKeyPress = (event) => {
       
        if(event.key === 'Enter'){
            savePeople();
        }
        if(event.key === 'Escape'){
           setModal(false)
        }
      }
     
    return (
        <div className='bg-gray-600/20 backdrop-blur-sm inset-0 fixed z-30 flex justify-center items-center' onKeyDown={(e)=>handleKeyPress(e)}>
            <div className='w-2/4 h-2/4 bg-white shadow-lg border flex flex-col justify-between'>
                <div>
                <h3 className='py-2 px-3 bg-gray-100 border border-b flex justify-between items-center'>
                    <span className='text-xs'>شخص جدید</span>
                    <button onClick={() => setModal(false)}><IoCloseOutline size={15} className='cursor-pointer' /></button>
                </h3>
               {children}
                </div>
                <div className='flex justify-end items-center gap-2 px-5 pb-5'>
                   <button onClick={()=>savePeople()} className='btn-success text-xs'>ذخیره</button>
                   <button onClick={()=>setModal(false)} className='btn-danger text-xs'>انصراف</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;