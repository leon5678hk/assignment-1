import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { isNotEmpty, isValidEmailFormat } from './Validators';

const PasswordInput = ({ placeholder, password, setPassword, errorMessage }) => {
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
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <i
                onClick={() => setShowPassword(!showPassword)}
                className={iconClassName}
            >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
            </i>
        </div>
    );
};

const LoginModal = ({ onClose, onSuccessfulLogin }) => {
    const [activeTab, setActiveTab] = useState('login');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signUpErrors, setSignUpErrors] = useState({});
    const [loginErrors, setLoginErrors] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const apiUrl = "https://server-app-latest.onrender.com";
    const apiUrl = "http://localhost:3000";
    const handleSignUp = (e) => {
        e.preventDefault();

        if (!validateSignUp()) {
            return;
        }

        const userData = {
            firstName,
            lastName,
            email: signUpEmail,
            password: signUpPassword
        };

        fetch(`${apiUrl}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    if (data.error === "Email already exists") {
                        // Handle duplicate email error
                        setSignUpErrors(prevErrors => ({ ...prevErrors, email: "*Email is used" }));
                    } else {
                        // Handle other errors
                        console.error('Signup error:', data.message);
                    }
                    return;
                }
                onClose(); // Close the modal or redirect the user
                alert('User registered successfully');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while registering. Please try again.');
            });
    };

    const validateSignUp = () => {
        let errors = {};
        let isValid = true;

        if (!isNotEmpty(firstName)) {
            errors.firstName = "*First Name is required";
            isValid = false;
        }
        if (!isNotEmpty(lastName)) {
            errors.lastName = "*Last Name is required";
            isValid = false;
        }
        if (!isNotEmpty(signUpEmail)) {
            errors.email = "*Email is required";
            isValid = false;
        } else if (!isValidEmailFormat(signUpEmail)) {
            errors.email = "*Invalid email format";
            isValid = false;
        }
        if (!isNotEmpty(signUpPassword)) {
            errors.password = "*Password is required";
            isValid = false;
        }

        if (!isNotEmpty(confirmPassword)) {
            errors.confirmPassword = "*Confirm Password is required";
            isValid = false;
        } else if (signUpPassword !== confirmPassword) {
            errors.confirmPassword = "*Passwords do not match";
            isValid = false;
        }


        setSignUpErrors(errors);
        return isValid;
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (!validateLogin()) {
            return;
        }

        const loginData = {
            email,
            password
        };

        fetch(`${apiUrl}/users/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
        .then(response => {
            // Check if the response is not ok, indicating an error
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful login
            console.log("Login Successful:", data); 
            onSuccessfulLogin(data); 
            onClose(); 
        })
        .catch(error => {
            // Handle login error
            console.error('Error:', error);
            alert('Failed to login. Please check your credentials and try again.');
            setLoginErrors({ general: 'Failed to login. Please check your credentials and try again.' });
        });

    };

    const validateLogin = () => {
        let errors = {};
        let isValid = true;

        // Validate Email
        if (!isNotEmpty(email)) {
            errors.email = "*Email is required";
            isValid = false;
        } else if (!isValidEmailFormat(email)) {
            errors.email = "*Invalid email format";
            isValid = false;
        }

        // Validate Password
        if (!isNotEmpty(password)) {
            errors.password = "*Password is required";
            isValid = false;
        }

        // Set errors
        setLoginErrors(errors);
        return isValid;
    };

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
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="form-input"
                            />
                            {loginErrors.email && <div className="error-message">{loginErrors.email}</div>}
                        </div>


                        <PasswordInput
            placeholder="Password"
            password={password}
            setPassword={setPassword}
            errorMessage={loginErrors.password}

        />                        <div className="form-button-container">
                            <button className="form-button" onClick={handleLogin}>Login</button>
                        </div>
                    </div>
                )}

                {/* Sign Up */}
                {activeTab === 'signup' && (
                    <div className="signup-form">
                        {/* First Name */}
                        <div className="form-input-container">
                            <input type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                className="form-input"
                            />
                            {signUpErrors.firstName && <div className="error-message">{signUpErrors.firstName}</div>}
                        </div>

                        {/* Last Name */}
                        <div className="form-input-container">
                            <input type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                className="form-input"
                            />
                            {signUpErrors.lastName && <div className="error-message">{signUpErrors.lastName}</div>}
                        </div>

                        {/* Email */}
                        <div className="form-input-container">
                            <input
                                type="email"
                                placeholder="Email"
                                value={signUpEmail} // Use signUpEmail here
                                onChange={e => setSignUpEmail(e.target.value)} // Use setSignUpEmail here
                                className="form-input"
                            />
                            {signUpErrors.email && <div className="error-message">{signUpErrors.email}</div>}
                        </div>

                        {/* Password */}
                        <PasswordInput
                            placeholder="Password"
                            password={signUpPassword}
                            setPassword={setSignUpPassword}
                            errorMessage={signUpErrors.password}
                        />

                        {/* Confirm Password */}
                        <PasswordInput
                            placeholder="Confirm Password"
                            password={confirmPassword} // Change confirmPassword to password
                            setPassword={setConfirmPassword} // Change setConfirmPassword to setPassword
                            errorMessage={signUpErrors.confirmPassword}
                            isConfirmPassword={true}
                        />
                        <div className="checkbox-container">
                            <input type="checkbox" id="terms" />
                            <label htmlFor="terms" className="form-checkbox-label">I agree to all terms</label>
                        </div>
                        <div className="form-button-container">
                            <button className="form-button" onClick={handleSignUp}>Sign Up</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginModal;