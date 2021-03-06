import React, {ChangeEvent, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Player} from "../types/player";
import {Alert, Button, Modal} from "react-bootstrap";

function getEmptyPlayer(): Player {
   return  {
       attackCount: 0, blockCount: 0, name: "", passCount: 0, receiveCount: 0, serveCount: 0
   }
}

interface Props {
    onAddPlayer: (player: Player) => void;
}

function ControlPanel({onAddPlayer}: Props) {
    function handleAddPlayer() {
        if (player.name !== "") {
            onAddPlayer(player);
            handleCloseModal();
        } else {
            setError(true);
        }
    }

    function handleChangeName({target: {value}}: ChangeEvent & {target: {value: string}}) {
        setError(false);
        setPlayer({...player, name: value})
    }

    function handleOpenModal() {
        setPlayer(getEmptyPlayer());
        setModalOpen(true);
    }

    function handleCloseModal() {
        setError(false);
        setModalOpen(false);
    }

    const [isModalOpen, setModalOpen] = useState(false);
    const [player, setPlayer] = useState<Player>(getEmptyPlayer());
    const [hasError, setError] = useState(false);

    return (
        <div>
            <FontAwesomeIcon className="ms-2 p-2" icon={faPlus} color="#6960EC" onClick={handleOpenModal}/>
            <Modal show={isModalOpen} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Adding Player</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {hasError && <Alert variant="danger">Name can't be empty</Alert>}
                    <div className="d-flex align-items-center w-100">
                        <span className="me-2">Player Name:</span>
                        <input className="flex-grow-1" onChange={handleChangeName} value={player.name}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddPlayer}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ControlPanel;