import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { cityWhithWeather, type SlipData } from "../services/axios.weatherapp";
interface climateState {
  searchResult: SlipData[];
  loading: boolean;
}

const initialState: climateState = {
  searchResult: [],
  loading: false,
};

export const fetchSearch = createAsyncThunk<SlipData[], string>(
  "climate/fetchSearch",
  async (query: string) => {
    try {
      const data = await cityWhithWeather(query);
      return data;
    } catch (error) {
      console.log("Ciudad no encontrada", error);
      throw error;
    }
  },
);

export const climateSlice = createSlice({
  name: "cardClimate",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSearchResult: (state, action: PayloadAction<[]>) => {
      state.searchResult = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.searchResult = action.payload;
    });
    builder.addCase(fetchSearch.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { setLoading, setSearchResult } = climateSlice.actions;

export default climateSlice.reducer;
