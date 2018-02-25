import React from 'react';

const Navbar = () => {
    return (
      <nav>
        <div className="nav-wrapper green lighten-2">
            <a href="#" className="brand-logo left thin"></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="" className="dropdown-button" data-activates="dropdown1"></a>Drowpdown<i className="material-icons right">arrow_drop_down</i></li>
            </ul>
        </div>
      </nav>
      )
      
}

export default Navbar;
