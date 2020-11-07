import React, { useState } from 'react';
import firebase from 'services/firebase';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState({});

    const onEmailChange = (e) => {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        const val = e.target.value;

        if (val.length === 0) {
            setError({ ...error, email: 'Email is required.' });
        } else if (!regex.test(val)) {
            setError({ ...error, email: 'Invalid email' });
        } else {
            setError({ ...error, email: '' });
        }

        setEmail(val);
    };

    const onPasswordChange = (e) => {
        const val = e.target.value;

        if (val.length === 0) {
            setError({ ...error, password: 'Password is required.' });
        } else if (val.length < 8) {
            setError({ ...error, password: 'Password length should be greater than 8 characters' });
        } else {
            setError({ ...error, password: '' });
        }

        setPassword(val);
    };

    const onNameChange = (e) => {
        const val = e.target.value;

        if (val.length === 0) {
            setError({ ...error, name: 'Display Name is required.' });
        } else if (val.length < 5) {
            setError({ ...error, name: 'Name length should be greater than 5 characters' });
        } else {
            setError({ ...error, name: '' });
        }

        setName(val);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (email && password && name && Object.keys(error).every(key => !error[key])) {
            try {
                const { user } = await firebase.createUser(email, password);
                await firebase.addUser(user.uid, {
                    displayName: name,
                    email,
                    photoURL: `https://ui-avatars.com/api/?name=${name}`,
                    joined: new Date().getTime(),
                    isAuth: true
                });

            } catch (e) {
                throw new Error('Cannot create user', e);
            }
        }
    };

    const errorClassName = (field) => {
        return error[field] ? 'form-field input-error' : 'form-field';
    };

    return (
        <div className="signup">
            <h1 className="form-title">Sign Up</h1>
            <form id="signup-form">
                <div className={errorClassName('name')}>
                    <label className="form-label" htmlFor="name">{error.name ? error.name : 'Display Name'}</label>
                    <input
                        type="text"
                        id="name"
                        onChange={onNameChange}
                        placeholder="John Doe"
                        required
                        maxLength={30}
                        style={{ textTransform: 'capitalize' }}
                        value={name}
                    />
                </div>
                <br />
                <div className={errorClassName('email')}>
                    <label className="form-label" htmlFor="email">{error.email ? error.email : 'Email'}</label>
                    <input
                        type="email"
                        id="email"
                        onChange={onEmailChange}
                        placeholder="example@gmail.com"
                        required
                        maxLength={30}
                        value={email}
                    />
                </div>
                <br />
                <div className={errorClassName('password')}>
                    <label className="form-label" htmlFor="password">{error.password ? error.password : 'Password'}</label>
                    <input
                        type="password"
                        onChange={onPasswordChange}
                        placeholder="Enter your password"
                        required
                        maxLength={40}
                        value={password}
                    />
                </div>
                <br />
                <button type="submit" onClick={onSubmit}>Sign Up</button>
            </form>
            <br />
            <div className="signin-social-login">
                <button
                    className="btn-facebook btn-icon"
                    onClick={firebase.signInWithFacebook}
                >
                    <i className="fab fa-facebook" />
                    <span>Facebook</span>
                </button>
                <button
                    className="btn-google btn-icon"
                    onClick={firebase.signInWithGoogle}
                >
                    <i className="fab fa-google" />
                    <span>Google</span>
                </button>
            </div>
        </div>
    );
};

export default SignUp;
