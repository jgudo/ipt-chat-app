import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Home = () => {
    const [activePage, setActivePage] = useState('signin');
    const tabClassName = (val) => {
        return val === activePage ? 'active' : '';
    }

    return (
        <div className="home">
            <ul className="tab">
                <li className={tabClassName('signin')} onClick={() => setActivePage('signin')}>Login</li>
                <li className={tabClassName('signup')} onClick={() => setActivePage('signup')}>Sign Up</li>
            </ul>
            {activePage === 'signin' ? <SignIn /> : <SignUp />}
        </div>
    );
};

export default Home;
