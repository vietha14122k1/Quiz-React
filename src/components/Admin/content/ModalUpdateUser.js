import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/apiServices'
import _ from 'lodash'
const ModalUpdateUser = (props) => {
    const { show, setShow, dataUpdate } = props;


    const handleClose = () => {
        setShow(false)
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setImg("");
        setPreviewImg("");
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImg] = useState("");
    const [previewImg, setPreviewImg] = useState("")

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            setImg("");
            if (dataUpdate.image) {
                setPreviewImg(`data:image/jpeg;base64,${dataUpdate.image}`);

            }
        }
    }, [props.dataUpdate])

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImg(URL.createObjectURL(event.target.files[0]))
            setImg(event.target.files[0])
        }
        else {
            setPreviewImg("");
        }
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handSubmitCreateUser = async () => {
        const isValidateEmail = validateEmail(email)
        if (!isValidateEmail) {
            toast.error('invalid email')
            return
        }
        let data = await putUpdateUser(dataUpdate.id, username, role, image)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // await props.fetchListUsers();
            // props.setCurrenPage(1)
            await props.fetchListUsersPaginate(props.currenPage)
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose}
                backdrop="static"
                size="xl"
                className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Update a USER </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} disabled onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} disabled onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select" onChange={(event) => setRole(event.target.value)}>
                                <option selected value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor='labelUpload'>
                                <FcPlus />
                                Upload file Image
                            </label>
                            <input type='file' id='labelUpload' hidden onChange={(event) => handleUploadImage(event)}></input>
                        </div>
                        <div className="col-md-12 img-preview">
                            {previewImg ?
                                <img src={previewImg} />
                                :
                                <span>Preview Image</span>
                            }


                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;