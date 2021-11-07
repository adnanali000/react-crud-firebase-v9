import {useState,useEffect} from 'react';
import {Link,useLocation} from 'react-router-dom';
import './header.css';

import React from 'react'

const Header = () => {
    const [activeTab,setActiveTab] = useState("Home");
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === '/'){
            setActiveTab("Home")
        }else if(location.pathname === '/add'){
            setActiveTab("AddContact")
        }else if(location.pathname === '/about'){
            setActiveTab("About")
        }
    }, [location])
    return (
        <div>
            <div className="header">
                <p className="logo">Contact App</p>
                <div className="header-right">
                    <Link to="/">
                        <p className={`${activeTab === "Home" ? "active" : " " }`} onClick={()=>setActiveTab("Home")} >
                            Home
                        </p>
                    </Link>

                    <Link to="/add">
                        <p className={`${activeTab === "AddContact" ? "active" : " " }`} onClick={()=>setActiveTab("AddContact")} >
                            Add Contact
                        </p>
                    </Link>

                    <Link to="/about">
                        <p className={`${activeTab === "About" ? "active" : " " }`} onClick={()=>setActiveTab("About")} >
                            About
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header
