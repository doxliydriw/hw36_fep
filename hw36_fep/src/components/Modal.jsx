import React from 'react'
import '../components/Modal.css'

function Modal({setOpenModal, deleteEntry, entry}) {
    // console.log(entry);
    // () => props.deleteEntry(props.entry.id)
    const confirmDelete = (entry) => {
        deleteEntry(entry);
        setOpenModal(false);
    }
    return (
        <div className='modalBackground'>
            <div className='modalCntr'>
                <div className='titleCloseBtn'>
                    <button className='modalClose' onClick={() => setOpenModal(false)}>x</button>
                </div>
                <div className='title'>
                    <h3>confirm delete?</h3>
                </div>
                <div className='body'>
                    <p>entry <strong>{entry.name}</strong> will be deleted permanetly</p>
                </div>
                <div className='footer'>
                    <button className='modalConfirm' onClick={() => confirmDelete(entry.id)}>yes</button>
                    <button className='modalCancel' onClick={() => setOpenModal(false)} id='cancelBtn'>no</button>
                </div>
            </div>
        </div>
   );
};

export default Modal