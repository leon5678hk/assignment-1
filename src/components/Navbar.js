import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import { FaBars } from 'react-icons/fa';

const NavBar = () => {
    const navigate = useNavigate();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef();


    const toggleLoginModal = () => {
        setShowLoginModal(!showLoginModal);
        setShowMenu(false);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleLinkClick = (path) => {
        navigate(path);
        setShowMenu(false);
    };
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo" onClick={() => navigate('/')}>MYvideo</div>

                <div className="burger-menu" onClick={toggleMenu}>
                    <FaBars />
                </div>
                <div ref={menuRef} className={showMenu ? "nav-menu active" : "nav-menu"}>

                    {showMenu && (
                        <>

                            <button className="nav-button" onClick={() => handleLinkClick('/movies')}>Movies</button>
                            <button className="nav-button" onClick={() => handleLinkClick('/tv')}>TV</button>
                            <button className="nav-button" onClick={toggleLoginModal}>Sign In</button>
                            <form action="/search" method="get" className="search-form-dropdown">
                                <input type="search" name="q" placeholder="Search" className="search-dropdown" />
                            </form>
                        </>
                    )}
                </div>

                <div className="nav-items">
                    <button className="nav-button" onClick={() => navigate('/movies')}>Movies</button>
                    <button className="nav-button" onClick={() => navigate('/tv')}>TV</button>
                </div>

                <div className="search-container">
                    <form action="/search" method="get">
                        <input className="search" type="search" name="q" placeholder="Search" />
                        <label className="button searchbutton" htmlFor="searchInput">
                            <span className="mglass">&#9906;</span>
                        </label>
                    </form>
                </div>

                <div className="nav-actions">
                    <button className="nav-button" onClick={toggleLoginModal}>Sign In</button>
                </div>
            </div>

            {showLoginModal && <LoginModal onClose={toggleLoginModal} />}
        </nav>
    );
};

export default NavBar;