import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IUser {
  id: number;
  name: string;
  description?: string;
  images?: any[];
}

interface TodoState {
  data: IUser[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: TodoState = {
  data: [],
  isLoading: false,
  isError: false,
};

const url = "https://to-dos-api.softclub.tj/api/to-dos";

// GET
export const getData = createAsyncThunk(
  "todo/getData",
  async () => {
    const { data } = await axios.get(url);
    return data.data;
  }
);

// DELETE
export const deleteUser = createAsyncThunk(
  "todo/deleteUser",
  async (id: number, { dispatch }) => {
    await axios.delete(`${url}?id=${id}`);

    dispatch(getData());
  }
);

// ADD
export const addUser = createAsyncThunk(
  "todo/addUser",
  async (
    user: {
      name: string;
      description: string;
      image: File;
    },
    { dispatch }
  ) => {
    const formData = new FormData();

    formData.append("Name", user.name);
    formData.append("Description", user.description);
    formData.append("Images", user.image);

    await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(getData());
  }
);

export const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET
      .addCase(getData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })

      .addCase(getData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // ADD
      .addCase(addUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      // DELETE

      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
      })

  },
});

export default TodoSlice.reducer;