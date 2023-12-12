"use client";

import AutoCompleteAddress from './AutoCompleteAddress';

function Booking() {
    const screenHeight = window.innerHeight*0.72;
  return (
    <div className="p-5">
        <h2 className="text-xl font-semibold">Booking</h2>
        <div className="p-5 rounded-md" style={{height: screenHeight}}>
        <AutoCompleteAddress />
        </div>
    </div>
  )
}

export default Booking;