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
                {start:'2017-08-14', end:'2017-08-18'}], selected_ranges:[{start:'2017-09-04', end:'2017-09-07'}]},
            {id:2, title:'Peter', subtitle:'code monkii 2', events: [
                {start:'2017-08-07', end:'2017-08-11'}], selected_ranges:[]},
                ]
        };
    }
    // when button is clicked
    _create_events(w) {
        // create events from selected_ranges on row, reset selected_ranges
       console.log('this.state', this.state)
       let rows_copy = this.state.rows.slice();
       rows_copy = rows_copy.map(row => {
        row.events = [...row.events, ...row.selected_ranges];
        row.selected_ranges = [];
       });
       this.setState((prev_state, props) => {
        rows:rows_copy
       }); 
    }
    _handle_ranges(data) {

        // update selected_ranges on row

        console.log('data in App', data);
        // set correct state here
        
        this.setState((prev_state,props) => {
            let rows_copy = prev_state.rows.slice();
            let found = _.find(rows_copy, row => row.id === data.id);
            found.selected_ranges = [...found.selected_ranges, ...data.ranges];

            return {
                rows: rows_copy
            }
        });
    }
    _event_click(data) {
        this.setState((prev_state, props) => {
            console.log('got clicked!');
            let event_range = data.range;
            let rows_copy = this.state.rows.slice();
            const new_rows = rows_copy.map(row => {
                row.events = _.filter(row.events, event => {
                    console.log('what is it',event_range.start === event.start && event_range.end === event.end);
                    if(row.id === data.id) {
                        return !(event_range.start === event.start && event_range.end === event.end);    
                    } else {
                        return event;
                    }
                    
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
