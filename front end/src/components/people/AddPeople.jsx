import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

import Modal from '../../modules/ModalModule/Modal';
import ModalInput from '../../modules/ModalModule/ModalInput';
import { toast, ToastContainer } from 'react-toastify';
const AddPeople = ({ setModal }) => {
    const [category, setCategory] = useState([-1]);
    const [name, setName] = useState('');
    const [family, setFamily] = useState('');
    const [father, setFather] = useState('');
    const [code, setCode] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [peopleType, setPeopleType] = useState(0);
    const [peopleCategory, setPeopleCategory] = useState(1);
    useEffect(() => {
        axios.get('http://localhost:8000/api/people-category').then(res => setCategory(res.data));
    
    }, [])
    const savePeople = () => {

        axios.post('http://localhost:8000/api/people', {
            name: name,
            family: family,
            father_name: father,
            people_category_id: peopleCategory,
            postal_code: code,
            people_type: peopleType,
            phone:mobile,
            address:address,
            email:email
        }).then(res => {
            setModal(false);
            toast.success(res.data.message)
        }).catch(e => {

            Object.entries(e.response.data.messages).map(([key, val]) => {
                toast.error(val[0]);
            }

            )
        })
    }
    return (
        <Modal setModal={setModal} savePeople={savePeople}>
          
            <div className='grid grid-cols-2 text-sm p-5'>
                <div>
                    <div className='grid grid-cols-4 pb-2'>
                        <span className='col-span-1 text-center'>گروه شخص :</span>
                        <select onChange={(e) => setPeopleCategory(e.target.value)} className='col-span-3 ml-10 border border-gray-200 focus:outline-none '>
                            {category[0] !== -1 ?
                                (
                                    category.data.map((item, index) => (
                                        <option key={index}>{item.peopleCategory}</option>
                                    ))
                                )
                                :
                                (
                                    <option> در حال بارگزاری</option>
                                )
                            }
                        </select>
                    </div>

                    <ModalInput label='نام' input={name} setInput={setName} focus={true}/>
                    <ModalInput label='نام خانوادگی' input={family} setInput={setFamily} />
                    <ModalInput label='نام پدر' input={father} setInput={setFather} />

                    <ModalInput label='کد پستی' input={code} setInput={setCode} />
                </div>
                <div>
                    <div className='grid grid-cols-4 pb-2'>
                        <span className='col-span-1 text-center'> نوع شخص</span>
                        <select   value={peopleType} onChange={(e) => setPeopleType(e.target.value)} className='col-span-3 ml-10 border border-gray-200 focus:outline-none '>
                            <option value={0}> حقیقی </option>
                            <option value={1}> حقوقی </option>
                        </select>
                    </div>

                    <ModalInput label='موبایل' input={mobile} setInput={setMobile} />
                    <ModalInput label='ایمیل' input={email} setInput={setEmail} />

                </div>
                <div className='col-span-2'>
                    <ModalInput label='آدرس' inputType='textArea' input={address} setInput={setAddress} />
                </div>

            </div>

        </Modal>

    );
};

export default AddPeople;