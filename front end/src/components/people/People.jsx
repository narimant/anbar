import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import {  FaUser } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import {  RingLoader } from 'react-spinners';
import {decode} from 'html-entities';
import { HiUserAdd } from "react-icons/hi";
import AddPeople from './AddPeople';
import EditPeople from './EditPeople';
const People = () => {
    const [people, setPeople] = useState([-1]);
    const [addModal,setAddModal]=useState(false);
    const [editModal,setEditModal]=useState(false);
    const [searchQuery,setSearchQuery]=useState('');
    const [peopleId,setPeopleId]=useState(0);
    useEffect(() => {
       
        if(searchQuery){
            axios.get(`http://localhost:8000/api/search-people/${searchQuery}`).then(res => setPeople(res.data));
        }else{
            axios.get('http://localhost:8000/api/people').then(res => setPeople(res.data));
        }
       

    }, [addModal,editModal,searchQuery])
    
    const changePage = (page) => {
        axios.get(page).then(res => setPeople(res.data));
    }

const editPeople=(id)=>{
    setPeopleId(id)
    setEditModal(true);
}

    return (
        <>
        <div className='relative'>
            <h3 className='border px-3 py-2 flex justify-between items-center w-fit gap-5 bg-white mr-2  z-50'>
                <span className='flex gap-3 items-center' >
                    <span><FaUser size={15} className="text-red-500" /></span>
                    <span className='text-xs'>اشخاص</span>
                </span>
                <IoCloseOutline className='cursor-pointer' />
            </h3>
            <div className="flex flex-col bg-white border m-2 mt-0 p-5">
               <div>
                <button onClick={()=>setAddModal(true)} className="flex gap-2 items-center bg-green-500 text-white rounded-md px-3 py-2 hover:bg-green-800">
                <HiUserAdd size={25}/>
                <span className=''>جدید</span>
                
                </button>
               </div>
                    <div className="py-3 px-4">
                        <div className="relative w-fit border rounded-md">
                            <input type="text" onChange={(e)=>setSearchQuery(e.target.value)} value={searchQuery} className="outline-none px-3 py-2" placeholder="جست و حو بر اساس نام" />
                                <CiSearch  className='absolute left-2 top-3'/>
                        </div>
                    </div>
                    <div>
                        <table className="w-full divide-y divide-gray-200 dark:divide-neutral-700">
                            <thead className="bg-gray-50 dark:bg-neutral-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">کد</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">گروه</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">نام</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">نام خانوادگی</th>
                                    <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">تلفن همراه</th>
                                    <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">عملیات </th>

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                {
                                    people[0] == -1 ? (
                                        <tr>
                                            <td colSpan={6} align='center'>

                                                <RingLoader color="#36d7b7" />

                                            </td>
                                        </tr>

                                    ) : (

                                        people.data.map((item, index) => (
                                            <tr key={index}>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{(people.meta.current_page*10-10)+index+1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.peopleCategoryName.peopleCategory}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.family}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.phone}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                    <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400">حذف</button>
                                                    <button onClick={()=>editPeople(item.id)}>ویرایش</button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }


                            </tbody>
                        </table>
                        <div className='flex items-center justify-center'>
                            {people[0] !== -1 && people.meta.links.map((page, i) => (
                                <span  onClick={() => changePage(page.url)} className={`border cursor-pointer rounded-sm px-2 py-2 mr-1 ${page.active && `bg-blue-500 text-white`}`} key={i}>

                                    {decode(page.label)}
                                    </span>
                            ))}
                        </div>
                    </div>
               
            </div>
            
            {/* modal */}
         
        </div>
        {addModal && <AddPeople setModal={setAddModal} />}
        {editModal && <EditPeople setModal={setEditModal} id={peopleId} />}
        </>


    );
};

export default People;