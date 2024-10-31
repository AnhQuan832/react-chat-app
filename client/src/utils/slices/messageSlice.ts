import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMate, ChatMessage } from "../classes";
import contactApi from "@/api/contactApi";

interface MessageState {
  messages: Map<string, ChatMessage>;
  listContacts: ChatMate[];
  selectedChatMate: ChatMate;
}

const initialState: MessageState = {
  messages: new Map<string, ChatMessage>(),
  listContacts: [],
  selectedChatMate: null,
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.set(state.selectedChatMate.id, action.payload);
    },
    selectChatMate: (state, action: PayloadAction<ChatMate>) => {
      state.selectedChatMate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getContacts.fulfilled, (state, action) => {
      state.listContacts = action.payload;
    });
  },
});

export const getContacts = createAsyncThunk(
  "messages/getContacts",
  async (params) => {
    const response = await contactApi.getContacts(params);
    return response.data;
  }
);

export const { addMessage, selectChatMate } = messageSlice.actions;

export default messageSlice.reducer;
