import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';

const NavBar = ({ user, onSuccessfulLogin, onSignOut, onSearch }) => {
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

    const handleSignOutAndRedirect = () => {
        onSignOut();
        navigate('/'); // Redirect to home page after sign out
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

    const handleSearchEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = e.target.value.trim();
            if (query) {
                // Update the URL with the search query
                window.history.pushState({}, '', `/search?query=${encodeURIComponent(query)}`);
    
                // Refresh the page
                window.location.reload();
            }
        }
    };


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
                            
                            
                            {user ? (
                                <>
                                <button className="nav-button" onClick={() => handleLinkClick('/dashboard')}>
                                    Dashboard
                                </button>
                                <button className="nav-button" onClick={handleSignOutAndRedirect}>
                                    Sign Out
                                </button>
                                </>
                            ) : (
                                <button className="nav-button" onClick={toggleLoginModal}>Sign In</button>
                            )}                            
                            
                            <form action="/search" method="get" className="search-form-dropdown">
                                <input type="search" name="query" placeholder="Search" className="search-dropdown" />
                            </form>
                        </>
                    )}
                </div>

                <div className="nav-items">
                    <button className="nav-button" onClick={() => navigate('/movies')}>Movies</button>
                    <button className="nav-button" onClick={() => navigate('/tv')}>TV</button>
                </div>

                <div className="search-container">

                    <input
                        className="search"
                        type="search"
                        name="query"
                        placeholder="Search"
                        onKeyDown={handleSearchEnter}
                    />


                    <label className="button searchbutton" htmlFor="searchInput">
                        <span className="mglass">&#9906;</span>
                    </label>
                </div>

                <div className="nav-actions">
                    {user ? (
                        <>
                            <div className="nav-button" onClick={() => handleLinkClick('/dashboard')}>
                                Welcome, {user.firstName}
                            </div>
                            <FaSignOutAlt className="nav-button" onClick={handleSignOutAndRedirect} />
                        </>

                    ) : (
                        <button className="nav-button" onClick={toggleLoginModal}>Sign In</button> // Show sign in button
                    )}
                </div>
            </div>

            {showLoginModal && <LoginModal onClose={toggleLoginModal} onSuccessfulLogin={onSuccessfulLogin} />}
        </nav>
    );
};

export default NavBar;