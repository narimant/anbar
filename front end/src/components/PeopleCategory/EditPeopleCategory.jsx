import React, { useEffect, useState } from 'react';
import Modal from '../../modules/ModalModule/Modal';
import ModalInput from '../../modules/ModalModule/ModalInput';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditPeopleCategory = ({ setModal, id }) => {
    const [name, setName] = useState('');

    useEffect(() => {
    
        axios.get(`http://localhost:8000/api/people-category/${id}`).then(res => {
            const { peopleCategory } = res.data.data;
            setName(peopleCategory);
        });

    }, [])
    const savePeople = () => {

        axios.patch(`http://localhost:8000/api/people-category/${id}`, {
            name:name
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
                   

                    <ModalInput label='نام گروه' input={name} setInput={setName} focus={true} />
                    
                </div>
           
             

            </div>

        </Modal>

    );
};

export default EditPeopleCategory;