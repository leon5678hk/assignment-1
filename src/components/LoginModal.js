import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ placeholder }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const iconClassName = `password-toggle-icon ${showPassword ? 'active' : ''}`;

    return (
        <div className="form-input-container">
            <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={placeholder}
                className="form-input"
            />
            <i
                onClick={() => setShowPassword(!showPassword)}
                className={iconClassName}
            >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
            </i>
        </div>
    );
};

const LoginModal = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('login');

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {/* Tab Header */}
                <div className="accountMenu-switchTab">
                    <button
                        className={activeTab === 'login' ? 'accountMenu-activeTitle' : 'accountMenu-title'}
                        onClick={() => setActiveTab('login')}
                    >
                        Sign In
                    </button>
                    <button
                        className={activeTab === 'signup' ? 'accountMenu-activeTitle' : 'accountMenu-title'}
                        onClick={() => setActiveTab('signup')}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Login */}
                {activeTab === 'login' && (
                    <div className="login-form">
                        <div className="form-input-container">
                            <input type="email" placeholder="Customer Email" className="form-input" />
                        </div>
                        <PasswordInput placeholder="Password" />
                        <div className="form-button-container">
                            <button className="form-button" onClick={onClose}>Login</button>
                        </div>
                    </div>
                )}

                {/* Sign Up */}
                {activeTab === 'signup' && (
                    <div className="signup-form">
                        <div className="form-input-container">
                            <input type="text" placeholder="First Name" className="form-input" />
                        </div>
                        <div className="form-input-container">
                            <input type="text" placeholder="Last Name" className="form-input" />
                        </div>
                        <div className="form-input-container">
                            <input type="email" placeholder="Email" className="form-input" />
                        </div>
                        <div className="form-input-container">
                            <input type="tel" placeholder="Phone Number" className="form-input" />
                        </div>
                        <PasswordInput placeholder="Password" />
                        <PasswordInput placeholder="Confirm Password" />
                        <div className="checkbox-container">
                            <input type="checkbox" id="terms" />
                            <label htmlFor="terms" className="form-checkbox-label">I agree to all terms</label>
                        </div>
                        <div className="form-button-container">
                            <button className="form-button" onClick={onClose}>Sign Up</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginModal;