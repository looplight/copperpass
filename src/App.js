import React, { Component }  from 'react';
import moment                from 'moment';
import ReactDOM              from 'react-dom';
import _                     from 'lodash';
import Schedule              from './components/Schedule/Schedule';
import Button              from './components/Common/Button';
class App extends Component {
    constructor(props) {
        super(props);
        this._handle_ranges          = this._handle_ranges.bind(this);
        this.d = undefined;
        //NOTE(daniel): maybe some of these should be received via props?
        this.state = {
            selected_ranges:undefined,
            rows:[{id:1, title:'Daniel', subtitle:'code monkii 1', events: [
                {start:'2017-08-21', end:'2017-08-25'},
                {start:'2017-08-14', end:'2017-08-18'}]},
            {id:2, title:'Peter', subtitle:'code monkii 2', events: [
                {start:'2017-08-07', end:'2017-08-11'}]},
                ]
        };
    }
    // when button is clicked
    _create_events(w) {
        this.setState((prev_state,props) => {
            let rows_copy = prev_state.rows.slice();
            let found = _.find(rows_copy, row => row.id === this.d.id);
            found.events = [...found.events, ...this.d.ranges];

            return {
                rows: rows_copy
            }
        })        
    }
    _handle_ranges(data) {
        console.log('data in App', data);
        this.d = data;

    }
    _event_click(event_range) {
        
        this.setState((prev_state, props) => {
            console.log('got clicked!',event_range, prev_state.rows);
            let rows_copy = prev_state.rows.slice();
            const new_rows = rows_copy.map(row => {
                row.events = _.filter(row.events, event => {
                    console.log('what is it',event_range.start === event.start && event_range.end === event.end);
                    return !(event_range.start === event.start && event_range.end === event.end);
                })
                return row;
            });

            return {
                rows: new_rows
            }
        });
    }
    componentDidMount() {
    }

    componentWillUnmount() {
   
    }

    render() {
        return (
            <div>
                <Schedule rows={this.state.rows} today={moment()} update={this._handle_ranges} event_click={this._event_click.bind(this)}/>
                <Button handle_mouse_down={this._create_events.bind(this)}/>
            </div>)
    };
}

export default App;
