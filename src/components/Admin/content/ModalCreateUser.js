import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';

const ModalCreateUser = (props) => {
    const { show, setShow } = props;


    const handleClose = () => {
        setShow(false)
        setEmail("");
        setPassword("");
        setRole("USERS");
        setImg("");
        setPreviewImg("");
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImg] = useState("");
    const [previewImg, setPreviewImg] = useState("")
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
        if (!password) {
            toast.error('invalid password')
            return
        }


        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
        data.append('username', username);
        data.append('role', role);
        data.append('userImage', image);

        let res = await axios.post('http://localhost:8081/api/v1/participant', data);
        console.log(">>>>>chech res", res)
        if (res.data && res.data.EC === 0) {
            toast.success(res.data.EM)
        }
        if (res.data && res.data.EC !== 0) {
            toast.error(res.data.EM)
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
                    <Modal.Title>ADD NEW USER </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select" onChange={(event) => setRole(event.target.value)}>
                                <option selected value="USER">USER</option>
                                <option selected value="ADMIN">ADMIN</option>
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

export default ModalCreateUser;