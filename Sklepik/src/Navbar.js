import React from 'react';
import './App.css';
import CartImg from './images/cart.svg';
import PersonImg from './images/person.svg';

const Navbar = ({toggleCart, toggleLogin}) => {
    return (
        <div className='nav1 w-100'>
            <button onClick={toggleCart} className='float-end'><img src={CartImg}></img></button>
            <button onClick={toggleLogin} className='float-end'><img src={PersonImg}></img></button>
        </div>
    )
}

export default Navbar