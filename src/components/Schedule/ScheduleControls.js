import React, { Component } from 'react';
import moment               from 'moment';

const ScheduleControls = ({on_previous,on_next,month,}) => {
    return (
      <div className="row justify-content-md-center unselectable border">
          <div className="col text-center col-12 col-md-auto pointer" onClick={on_previous}>Previous</div>
          <div className="col text-center col-12 col-md-auto default-cursor">{month} </div>
          <div className="col text-center col-12 col-md-auto pointer" onClick={on_next}>Next</div>
      </div>
      )
      
}

export default ScheduleControls;
