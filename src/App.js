import React, { Component }  from 'react';
import moment                from 'moment';
import _                     from 'lodash';
import Schedule              from './components/Schedule/Schedule';
import ScheduleControls      from './components/Schedule/ScheduleControls';
import Button                from './components/Common/Button';
class App extends Component {
    constructor(props) {
        super(props);
        this._handle_ranges          = this._handle_ranges.bind(this);
        //NOTE(daniel): maybe some of these should be received via props?
        this.state = {
            month:moment().startOf('month'),
            selected_ranges:undefined,
            rows:[
            {id:1, title:'Daniel', subtitle:'code monkii 1',
                events: [
                    {start:'2017-08-21', end:'2017-08-25'},
                    {start:'2017-08-28', end:'2017-09-01'}],
                    selected_ranges:[]
            },
            {id:2, title:'Peter', subtitle:'code monkii 2',
                events: [
                    {start:'2017-08-07', end:'2017-08-11'}], selected_ranges:[{start:'2017-08-01', end:'2017-08-04'}]
            },
{id:3, title:'Peter', subtitle:'code monkii 2',
                events: [
                    {start:'2017-08-07', end:'2017-08-11'}], selected_ranges:[{start:'2017-08-01', end:'2017-08-04'}]
            },    
{id:4, title:'Peter', subtitle:'code monkii 2',
                events: [
                    {start:'2017-08-07', end:'2017-08-11'}], selected_ranges:[{start:'2017-08-01', end:'2017-08-04'}]
            },    

{id:5, title:'Peter', subtitle:'code monkii 2',
                events: [
                    {start:'2017-08-07', end:'2017-08-11'}], selected_ranges:[{start:'2017-08-01', end:'2017-08-04'}]
            },    
{id:6, title:'Peter', subtitle:'code monkii 2',
                events: [
                    {start:'2017-08-07', end:'2017-08-11'}], selected_ranges:[{start:'2017-08-01', end:'2017-08-04'}]
            },    
{id:7, title:'Peter', subtitle:'code monkii 2',
                events: [
                    {start:'2017-08-07', end:'2017-08-11'}], selected_ranges:[{start:'2017-08-01', end:'2017-08-04'}]
            },    

{id:8, title:'Peter', subtitle:'code monkii 2',
                events: [
                    {start:'2017-08-07', end:'2017-08-11'}], selected_ranges:[{start:'2017-08-01', end:'2017-08-04'}]
            },    

{id:9, title:'Peter', subtitle:'code monkii 2',
                events: [
                    {start:'2017-08-07', end:'2017-08-11'}], selected_ranges:[{start:'2017-08-01', end:'2017-08-04'}]
            },                                                                                                                                   
        ]
        };
    }
    // when button is clicked
    _create_events(w) {
        //let rows_copy = _.cloneDeep(this.state.rows);
        let rows_copy = this.state.rows.slice();

        rows_copy = rows_copy.map(row => {
            row.events = [...row.events, ...row.selected_ranges];
            row.selected_ranges = [];
            return row;
        });

        this.setState({
            rows:rows_copy
        }); 
    }
    _handle_ranges(data) {
        //add to new selected_ranges state array, make sure we tag it with the row id
        console.log('data',data);
        this.setState((prev_state,props) => {
            //let rows_copy = _.cloneDeep(prev_state.rows);
            let rows_copy = this.state.rows.slice();
            let found_row = _.find(rows_copy, row => row.id === data.id);

            found_row.selected_ranges = data.ranges;

            return {
                rows: rows_copy
            }
        });
    }
    _event_click(data) {
        this.setState((prev_state, props) => {
            let event_range = data.range;
            //let rows_copy = _.cloneDeep(this.state.rows);
            let rows_copy = this.state.rows.slice();
            let row = _.find(rows_copy, row => row.id === data.id);
            row.events = _.filter(row.events, event => {
                return !(event_range.start === event.start && event_range.end === event.end);        
            })
            return {
                rows: rows_copy
            }
        });
    }

    _on_previous() {
        this.setState({month:this.state.month.subtract(1,'week').startOf('week')})
    }

    _on_next() {
        this.setState({month:this.state.month.add(1,'week')})
    }


    render() {
        const { rows, month } = this.state;
        const s = {"marginLeft":"100px", "marginRight":"0px","marginTop":"50px"}    
        return (
            <div className="">
                <ScheduleControls month={month.format('MMM YYYY')} on_previous={this._on_previous.bind(this)} on_next={this._on_next.bind(this)}/>
                <Schedule rows={rows} today={month} update={this._handle_ranges} event_click={this._event_click.bind(this)}/>
                <Button handle_mouse_down={this._create_events.bind(this)}/>
            </div>)
    }
}

export default App;
