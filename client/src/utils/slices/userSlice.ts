import UserApi from "@/api/userApi";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginFormField, RegisterFormField } from "@/utils/forms/authForms";

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    clearUser: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoggedIn = true;
    });
  },
});

export const login = createAsyncThunk(
  "user/login",
  async (params: typeof LoginFormField) => {
    const token = await UserApi.login(params);
    return token;
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (params: typeof RegisterFormField) => {
    const token = await UserApi.register(params);
    return token;
  }
);

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
