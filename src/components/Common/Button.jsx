import React     from 'react';

const Button = ({handle_mouse_down}) => {
    return (<button 
        className='btn color green lighten-2'
        onClick={handle_mouse_down}>Book it!</button>)
}

export default Button;


