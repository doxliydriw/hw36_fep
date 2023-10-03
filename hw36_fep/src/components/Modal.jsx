import React from 'react'
import '../components/Modal.css'
import { useDispatch, useSelector } from 'react-redux';

function Modal({ setOpenModal, entry }) {
    const list = useSelector(state => state.list)
    const dispatch = useDispatch();

//Action to  trigger the DELETE of the enrty from state
    const DELETE_ENTRY = "DELETE_ENTRY"
    const DeleteEntry = (array) => {
                            return {
                            type: DELETE_ENTRY,
                            payload: array
                            };
    };
    const DeleteEntryFromState = (entry) => {
                              dispatch(DeleteEntry(entry))
  }
    
    function deleteEntry(entry) {
    console.log('deleteing ', entry.name);
        const updatedList = list.filter((entry) => entry !== entry);
        return updatedList;
  };


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
                    <button className='modalConfirm' onClick={DeleteEntryFromState}>yes</button>
                    <button className='modalCancel' onClick={() => setOpenModal(false)} id='cancelBtn'>no</button>
                </div>
            </div>
        </div>
   );
};

export default Modal