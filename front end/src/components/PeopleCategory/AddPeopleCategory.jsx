import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

import Modal from '../../modules/ModalModule/Modal';
import ModalInput from '../../modules/ModalModule/ModalInput';
import { toast, ToastContainer } from 'react-toastify';
const AddPeopleCategory = ({ setModal }) => {

    const [name, setName] = useState('');

 
    const savePeople = () => {

        axios.post('http://localhost:8000/api/people-category', {
            name: name,

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
                    

                    <ModalInput label='نام گروه' input={name} setInput={setName} focus={true}/>

                </div>
            

            </div>

        </Modal>

    );
};

export default AddPeopleCategory;