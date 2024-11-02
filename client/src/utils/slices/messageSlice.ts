import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMate, ChatMessage } from "../classes";
import contactApi from "@/api/contactApi";

// interface MessageState {
//   messages: ;
//   listContacts: ChatMate[];
//   selectedChatMate: ChatMate;
// }

const initialState = {
  messages: {},
  listContacts: [],
  selectedChatMate: null,
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      const messages = state.messages[state.selectedChatMate.id];
      state.messages[state.selectedChatMate.id] = [...messages, action.payload];
    },
    selectChatMate: (state, action: PayloadAction<ChatMate>) => {
      state.selectedChatMate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getContacts.fulfilled, (state, action) => {
      state.listContacts = action.payload;
    });
    builder.addCase(getMessage.fulfilled, (state, action) => {
      state.messages[state.selectedChatMate.id] = action.payload;
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

export const getMessage = createAsyncThunk(
  "messages/getMessage",
  async (chatMateId: string) => {
    const response = await contactApi.getMessages(chatMateId);
    return response.data;
  }
);

export const { addMessage, selectChatMate } = messageSlice.actions;

export default messageSlice.reducer;
