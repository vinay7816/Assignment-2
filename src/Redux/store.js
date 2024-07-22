import { configureStore } from "@reduxjs/toolkit";
import ParticipantSlice from "./ParticipantSlice";
const store=configureStore({
    reducer:{
        Participants:ParticipantSlice,
    }
})
export default store