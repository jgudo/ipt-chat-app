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

        // use conditionals to only run once the setError on methods below
        // necessary due to asynchronicity of setting state

        if (!email) {
            onEmailChange({ target: { value: email } });
        } else {
            onPasswordChange({ target: { value: password } });
        }
    };

    const errorClassName = (field) => {
        return error[field] ? 'form-field input-error' : 'form-field';
    };

    return (
        <div
            className="signin fade"
            style={{
                border: `${authStatus ? '1px solid red' : 'none'}`,
                opacity: `${isLoading ? .5 : 1}`
            }}
        >
            {authStatus && (
                <div className="toast">
                    <h5>{authStatus}</h5>
                </div>
            )}
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
                        id="password"
                        readOnly={isLoading}
                        maxLength={40}
                        value={password}
                    />
                </div>
                <br />
                <button
                    className="btn-icon"
                    disabled={isLoading}
                    type="submit"
                    onClick={onSubmit}
                >
                    {isLoading && <div className="spinner spinner-light" />}
                    <span>Sign In</span>
                </button>
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
