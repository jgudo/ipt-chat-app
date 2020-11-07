import React, { useState, useContext } from 'react';
import { AppContext } from 'context/Provider';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Home = () => {
    const [activePage, setActivePage] = useState('signin');
    const { isLoading } = useContext(AppContext);
    const tabClassName = (val) => {
        return val === activePage ? 'active' : '';
    }

    return (
        <div className="home">
            <ul className="tab">
                <li className={tabClassName('signin')} onClick={() => setActivePage('signin')}>Sign In</li>
                <li className={tabClassName('signup')} onClick={() => setActivePage('signup')}>Sign Up</li>
            </ul>
            {activePage === 'signin' ? <SignIn /> : <SignUp />}
        </div>
    );
};

export default Home;
