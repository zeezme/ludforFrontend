import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface LoginState {
  username: string
  password: string
  email: string
  permissions: string[]
}

const initialState: LoginState = {
  username: "",
  password: "",
  email: "",
  permissions: [],
}

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setFieldValue<T extends keyof LoginState>(
      state: LoginState,
      action: PayloadAction<{ field: T; value: LoginState[T] }>
    ) {
      const { field, value } = action.payload
      state[field] = value
    },

    setState(_state, action: PayloadAction<LoginState>) {
      return { ...action.payload }
    },

    clearState(_state) {
      return { ...initialState }
    },
  },
})

export const { setFieldValue, clearState, setState } = loginSlice.actions
export default loginSlice.reducer
