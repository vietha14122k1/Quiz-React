import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalCreateUser from './ModalCreateUser';
import { FcPlus } from "react-icons/fc";
import './ManageUser.scss'
import TableUser from './TableUser';
const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)

    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="user-content">
                <div className='btn-add-new'>
                    <button className='btn btn-primary' onClick={() => setShowModalCreateUser(true)}> <FcPlus /> Add new user</button>
                </div>
                <div className='table-user-container'>
                    <TableUser />

                </div>
                <ModalCreateUser show={showModalCreateUser}
                    setShow={setShowModalCreateUser} />
            </div>
        </div>
    )
}
export default ManageUser