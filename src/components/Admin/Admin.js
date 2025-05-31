import SidBar from "./SidBar";
import './Admin.scss'
import { FaHeart, FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
import Language from "../Header/Language";
import NavDropdown from 'react-bootstrap/NavDropdown';

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <div className="admin-container">
            <div className="admin-sidbar">
                <SidBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => setCollapsed(!collapsed)}> <FaBars className="leftside" /> </span>
                    <div className="rightside">
                        <Language />
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item >Profile</NavDropdown.Item>
                            <NavDropdown.Item >Log Out</NavDropdown.Item>
                        </NavDropdown>

                    </div>

                </div>
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>


            </div>

        </div>
    )
}

export default Admin;