import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalCreateUser from './ModalCreateUser';
import { FcPlus } from "react-icons/fc";
import './ManageUser.scss'
import TableUser from './TableUser';
import { useEffect, useState } from "react";
import { getAllUsers, getUserWidthPaginate } from "../../../services/apiServices";
import ModalUpdateUser from './ModalUpdateUser'
import ModalViewUser from './ModalViewUser';
import ModallDeleteUser from './ModalDeleteUser';
import TableUserPaginate from './TableUserPaginate';
const ManageUser = (props) => {
    const LIMIT_USER = 6
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDetele] = useState({});
    const [listUsers, setListUsers] = useState([]);
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrenPage] = useState(1)
    useEffect(() => {
        // fetchListUsers()
        fetchListUsersPaginate(1)
    }, []);
    // fetch lại danh sách user
    const fetchListUsers = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }
    const fetchListUsersPaginate = async (page) => {
        let res = await getUserWidthPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUsers(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }


    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }

    const resetUpdateData = () => {
        setDataUpdate({})
    }
    const handleClickBtnView = (user) => {
        setShowModalViewUser(true);
    }
    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDetele(user)
    }

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
                    {/* <TableUser
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                    /> */}
                    <TableUserPaginate
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersPaginate={fetchListUsersPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrenPage={setCurrenPage}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersPaginate={fetchListUsersPaginate}
                    currentPage={currentPage}
                    setCurrenPage={setCurrenPage}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                    fetchListUsersPaginate={fetchListUsersPaginate}
                    currentPage={currentPage}
                    setCurrenPage={setCurrenPage}

                />
                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    fetchListUsers={fetchListUsers}

                    listUsers={listUsers}
                />
                <ModallDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersPaginate={fetchListUsersPaginate}
                    currentPage={currentPage}
                    setCurrenPage={setCurrenPage}


                />

            </div>
        </div>
    )
}
export default ManageUser