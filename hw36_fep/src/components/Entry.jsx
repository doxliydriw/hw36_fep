import { useState } from "react"
import Modal from "./modal"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Entry(entry) {
    entry = entry.entry;
    const list = useSelector(state => state.list)
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [OpenModal, setOpenModal] = useState(false)

    function HandleEditClick() {
                                navigate('/edit', { state: entry})
                            };
                            
    return (
        <div className="card">
            {OpenModal && <Modal
                                    setOpenModal={setOpenModal}
                                    entry={entry}
                                     />}
            <div className="cardBox">
                <ul className="cardList">
                    <li className="cardId">{list.indexOf(entry)+1}</li>
                    <li>Name: {entry.name}</li>
                    <li>phone: {entry.phone}</li>
                </ul>
                <div className="cardFooter">
                    <button className="deleteBtn smallBtn" onClick={() => {
                        setOpenModal(true)
                    }}>Delete</button>
                    <button className="editBtn smallBtn" onClick={() => {HandleEditClick()}}>edit</button>
                </div>
            </div>
        </div>
    )
}

export default Entry