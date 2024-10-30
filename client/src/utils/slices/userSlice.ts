import UserApi from "@/api/userApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginFormField, RegisterFormField } from "@/utils/forms/authForms";
import { User } from "@/utils/classes/User";

interface AuthState {
  loading: boolean;
  error: string | null;
  user: User | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  user: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(register.fulfilled, () => {});
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const login = createAsyncThunk(
  "user/login",
  async (params: typeof LoginFormField) => {
    const loginData = await UserApi.login(params);
    return loginData.data.user;
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (params: typeof RegisterFormField) => {
    const token = await UserApi.register(params);
    return token;
  }
);

export const getUserInfo = createAsyncThunk("user/user-info", async () => {
  const response = await UserApi.getUserInfo();
  return response;
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (state) => state.user;
