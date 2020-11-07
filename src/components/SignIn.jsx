import React, { useState } from 'react';
import firebase, { handleError } from 'services/firebase';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [authStatus, setAuthStatus] = useState(null);
    const [isLoading, setLoading] = useState(false);

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

    const onSubmit = async (e) => {
        e.preventDefault();

        if (email && password && !error.name && !error.email) {
            try {
                setLoading(true);
                setAuthStatus(null);
                await firebase.signIn(email, password);
                setLoading(false);
            } catch (e) {
                const error = handleError(e);
                setAuthStatus(error);
                setLoading(false);
                setPassword('');
            }
        }
    };

    const errorClassName = (field) => {
        return error[field] ? 'form-field input-error' : 'form-field';
    };

    return (
        <div className="signin">
            {authStatus && <h5 style={{ marginTop: 0, width: '100%', color: 'red', textAlign: 'center' }}>{authStatus}</h5>}
            <h1 className="form-title">Sign In</h1>
            <form id="signin-form">
                <div className={errorClassName('email')}>
                    <label className="form-label" htmlFor="email">{error.email ? error.email : 'Email'}</label>
                    <input
                        type="email"
                        id="email"
                        onChange={onEmailChange}
                        placeholder="example@gmail.com"
                        required
                        readOnly={isLoading}
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
                        readOnly={isLoading}
                        maxLength={40}
                        value={password}
                    />
                </div>
                <br />
                <button disabled={isLoading} type="submit" onClick={onSubmit}>Sign In</button>
                <br />
            </form>
            <div className="signin-social-login">
                <button
                    className="btn-facebook btn-icon"
                    disabled={isLoading}
                    onClick={firebase.signInWithFacebook}
                >
                    <i className="fab fa-facebook" />
                    <span>Facebook</span>
                </button>
                <button
                    className="btn-google btn-icon"
                    disabled={isLoading}
                    onClick={firebase.signInWithGoogle}
                >
                    <i className="fab fa-google" />
                    <span>Google</span>
                </button>
            </div>
        </div>
    );
};

export default SignIn;
