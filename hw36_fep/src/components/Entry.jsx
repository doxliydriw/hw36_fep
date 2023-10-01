import { useState } from "react"
import Modal from "./modal"
import { useNavigate } from "react-router-dom";

function Entry(props) {
                        const navigate = useNavigate();
                        const [OpenModal, setOpenModal] = useState(false)

    function HandleEditClick() {
                                navigate('/edit', { state: props.entry})
                            };
                            
    return (
        <div className="card">
            {OpenModal && <Modal
                                    setOpenModal={setOpenModal}
                                    deleteEntry={props.deleteEntry}
                                    entry={props.entry}
                                    // target={props.target}
                                     />}
            <div className="cardBox">
                <ul className="cardList">
                    <li className="cardId"{...props.listId}>{props.listId}</li>
                    <li>Name: {props.entry.name}</li>
                    {/* <li>{props.entry.email}</li> */}
                    <li>phone: {props.entry.phone}</li>
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