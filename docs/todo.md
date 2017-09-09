IMPORTANT!
[x] Sometimes the ranges sent back to 'Update' sets start and/or end to undefined, happend when startin on 4 5 6 and/or ending on 7
    should ne a bug in _get_selected_ranges


[x] Change data state in ScheduleListRow to be a "pure" array of data
[x] Build ScheduleListDay array from state.data
[x] Refactor handle_mouse_click

[x] Show hardcoded events
[x] Deselection
[x] Make event days non selectable
[x] Date ranges should be inclusive
[x] Create button component
[x] Add button component to each row for saving range

[x] Start using Schedule component
[x] Add hover color

[x] When calling function with selected range, also send the row id
[x] Use state for selected ranges

[x] Handle mouse up when outside of row

[x] Bug when creating new events on the side of an already existing event ()
[x] is_in_range should not care about order of "start" and "end"
[x] Calendar controls
[ ] Fixed number of days (spacers) so that calendar doesn’t jump around when switching date
    [ ] Always render 5 weeks worht of cells
    [ ] Center month days in row
[ ] in tests, send the date on day state instead of passing it into the event handler funcstions as a separate paramater
[ ] Make sure we do checks agains date strings/dates and not display_text
[ ] Styles for range start/end date
[ ] Rename prop.row to something else (prop.data?)
[ ] Clear ranges button (for learning purposes)
[ ] Connect events to a backend (Firebase?)
[ ] Connect notes to an event
[ ] Pending/aproved(true/false) events (event status)


[ ] Create documentation around component (as seen in the Pluralsight course "Creating reusable components")  
[ ] Display week numbers
[ ] Table header needs to be in a fixed position
[ ] Theme/style as props to Schedule
[ ] Gravatar component (probably app level and not in Schedule)
[ ] Live update of days left when selecting days

[ ] Add support for non-full days
[ ] Pivot selection/de-selection around day that was clicked
[ ] Redactor so that Schedule takes on_event_click as a prop
[ ] Props
    [ ] Selectable weekdays true/false
[ ] Schedule should accept a prop that defines starting day, instead of sending a moment object
[ ] error handle event ranges in inverse order

[ ] Make hover fade in, try different colors
[ ] Create responsive layouts
[ ] Write "advance" function that advances between events
