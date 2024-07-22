import React, { useState } from 'react';
import './Addparticpant.css';
import { useDispatch } from 'react-redux';
import { add } from '../Redux/ParticipantSlice';

const Addparticpant = ({ toggleModal }) => {
  const [input, setInput] = useState({
    Name: "",
    Time: ""
  });
  const dispatch=useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', input);

   
    const timeFormat = /^([0-5][0-9]):([0-5][0-9]):([0-9]{1,3})$/;
    if (!timeFormat.test(input.Time) || !input.Name) {
      alert('Please enter a valid name and time format');
      return;
    }

            dispatch(add(input))
 


    setInput({ Name: "", Time: "" });

    
    toggleModal();
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^0-9:]/g, '');
    setInput({ ...input, Time: sanitizedValue });
  };

  return (
    <div className='modal-overlay' >
      <div className='modal-body'>
        <div className='modal-content'>
          <button onClick={toggleModal} style={{ alignSelf: 'flex-end', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>X</button>
          <form onSubmit={handleSubmit}>
            <label htmlFor="Name">Username</label>
            <input id="Name" placeholder='Enter name' value={input.Name} onChange={(e) => setInput({ ...input, Name: e.target.value })} />
            <label htmlFor="Time">Time (MM:SS:MSS)</label>
            <input id="Time" placeholder='Enter time' value={input.Time} onChange={handleTimeChange} />
            <div className='button'>
              <button className='btn' type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addparticpant;
