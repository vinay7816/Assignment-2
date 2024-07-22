import { createSlice } from "@reduxjs/toolkit";

const getInitialParticipants = () => {
  const localParticipants = localStorage.getItem('participants');
  if (localParticipants) {
    return JSON.parse(localParticipants);
  }
  localStorage.setItem('participants', JSON.stringify([]));
  return [];
};

const initialvalue = {
  filterStatus: 'all',
  participants: getInitialParticipants()
};

const sortParticipants = (participants) => {
  return participants.sort((a, b) => {
    const timeA = a.Time.split(':').reduce((acc, time) => (60 * acc) + +time);
    const timeB = b.Time.split(':').reduce((acc, time) => (60 * acc) + +time);
    return timeA - timeB;
  });
};

const ParticipantSlice = createSlice({
  name: "participants",
  initialState: initialvalue,
  reducers: {
    add(state, action) {
      state.participants.push(action.payload);
      const participants = localStorage.getItem("participants");
      let participantsArr = [];
      if (participants) {
        participantsArr = JSON.parse(participants);
      }
      participantsArr.push(action.payload);
      localStorage.setItem("participants", JSON.stringify(sortParticipants(participantsArr)));
      state.participants = sortParticipants(participantsArr);
    }
  }
});

export const { add } = ParticipantSlice.actions;
export default ParticipantSlice.reducer;
