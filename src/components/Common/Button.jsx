import React, { Component }  from 'react';
import moment                from 'moment';
import ReactDOM              from 'react-dom';
import _                     from 'lodash';

class Button extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (<button 
            className='btn btn-default'
            onClick={this.props.handle_click}>Book it!</button>)

    }
}

export default Button;
