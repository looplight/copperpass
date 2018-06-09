[x] BUG! Dragselecting on first of march selects user cell
[ ] Icons in header
[ ] Searchbar in header
[ ] Better logo-font in header
[x] jan/feb bug when selecting right most days (days at the left most side also get selected)
[ ] Underline date in header for the current selected/hovering day
[ ] We can select days even though there is an event there. This couses us to overwrite eventdays with new selections.
[ ] Text on events?
[ ] Highlight either current week, day or both (in headers)
[ ] Do not change border color on the outermost selected days or eventdays
[x] Set bolder color to selected and event colors when days are selected or there is an event
[x] When finding clicked or entered day, find by date instead of display_text
[ ] drunk with sleep: an event day should know what range it is on so that we do not have to find the range on click. implent event id (???)
[x] "Fixed position" when selecting next and previous week (look at fc)
[x] Now that one page can show days from two different months, let's group header in month sections
[x] Experiment with not having datenumber on every td (maybe just have them in the header)
[ ] FC decides how many rows ro render depending on how many fit the size of the window... look into this
[ ] How do we handle the case of selecting ranges and swtiching between weeks. Kepp ranges selected or deslect?
[ ] Better distinction between "connecting" events
[ ] Make hover fade in, try different colors
[ ] Do not call click_event_handler when mouse_up outside of event (after clicking on an event) ???
[ ] Add header
[x] Test weekly slider
[x] Draging on selected event incorrectly sets selected state on row
[ ] remove container and make fullscreen (maybe)
IMPORTANT!
[x] Sometimes the ranges sent back to 'Update' sets start and/or end to undefined, happend when startin on 4 5 6 and/or ending on 7
[ ] should ne a bug in _get_selected_ranges
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
[x] When calling function with selected range, also send tcfgvhe row id
[x] Use state for selected ranges
[x] Handle mouse up when outside of row
[x] Bug when creating new events on the side of an already existing event ()
[x] is_in_range should not care about order of "start" and "end"
[x] Calendar controls
[x] Fixed number of days (spacers) so that calendar doesn’t jump around when switching date
[ ] Always start on a monday, fill in days from previous month untill we reach first in selected month. 'Filler days' should not be selectable
[ ] Connect notes to an event
[ ] Pending/aproved(true/false) events (event status)
[ ] Create documentation around component (as seen in the Pluralsight course "Creating reusable components")  
[ ] Display week numbers
[ ] Table header needs to be in a fixed position
[ ] Theme/style as props to Schedule
[ ] Gravatar component (probably app level and not in Schedule)
[ ] Live update of days left when selecting days
[ ] Add support for non-full days
[x] Pivot selection/de-selection around day that was clicked
[x] Refactor so that Schedule takes on_event_click as a prop
[ ] Props
    [ ] Selectable weekdays true/false
[ ] Schedule should accept a prop that defines starting day, instead of sending a moment object
[ ] error handle event ranges when set in inverse order
[ ] Create responsive layouts
[ ] Write "advance" function that advances between events
