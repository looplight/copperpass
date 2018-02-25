import React    from 'react';

const ScheduleControls = ({on_previous,on_next,month,}) => {
    return (
      <div className="row unselectable border">
          <div className="col text-center col-12 col-md-auto pointer material-icons" onClick={on_previous}>keyboard_arrow_left</div>
          <div className="col text-center col-12 col-md-auto default-cursor">{month} </div>
          <div className="col text-center col-12 col-md-auto pointer material-icons" onClick={on_next}>keyboard_arrow_right</div>
      </div>
      )
      
}

export default ScheduleControls;
