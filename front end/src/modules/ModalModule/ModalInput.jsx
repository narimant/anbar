import React from 'react';

const ModalInput = ({label,inputType="text",input,setInput,placeholder=null,focus=false}) => {
    return (
        <div className='grid grid-cols-4 pb-2'>
                            <span className='col-span-1 text-center'>{label}</span>
                            {inputType==="text" && (
                            <input  type='text' autoFocus={focus} value={input} onChange={(e)=>setInput(e.target.value)} placeholder={placeholder ? '' : placeholder } className='col-span-3 ml-10 border border-gray-200 focus:outline-none px-2'/>
                            )}
                             {inputType==="textArea" && (
                            <textarea  className='col-span-3 ml-10 border border-gray-200 focus:outline-none px-2 min-h-20' onChange={(e)=>setInput(e.target.value)} value={input}></textarea>
                            )}
                            
                        </div>
    );
};

export default ModalInput;