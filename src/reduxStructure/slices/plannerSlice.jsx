// src/reduxStructure/slices/plannerSlice.jsx
import { createSlice, nanoid } from "@reduxjs/toolkit";

const createDay = () => ({ id: nanoid(), items: [] });

const plannerSlice = createSlice({
  name: "planner",
  initialState: { selectedDayId: null, days: [] },
  reducers: {
    initPlanner(state) {
      if (state.days.length === 0) {
        const d = createDay();
        state.days.push(d);
        state.selectedDayId = d.id;
      }
    },
    addDay(state) {
      const d = createDay();
      state.days.push(d);
      state.selectedDayId = d.id;
    },
    deleteDay(state, action) {
      const id = action.payload;
      state.days = state.days.filter(d => d.id !== id);
      if (state.selectedDayId === id) {
        state.selectedDayId = state.days.length > 0 ? state.days[0].id : null;
      }
    },
    selectDay(state, action) {
      state.selectedDayId = action.payload;
    },
    addItemToSelectedDay(state, action) {
      const item = action.payload;
      const day = state.days.find(d => d.id === state.selectedDayId);
      if (!day) return;
      if (!day.items.some(x => x.id === item.id)) day.items.push(item);
    },
    removeItem(state, action) {
      const { dayId, itemId } = action.payload;
      const day = state.days.find(d => d.id === dayId);
      if (!day) return;
      day.items = day.items.filter(x => x.id !== itemId);
    }
  },
});

export const { initPlanner, addDay, deleteDay, selectDay, addItemToSelectedDay, removeItem } =
  plannerSlice.actions;

export default plannerSlice.reducer;



