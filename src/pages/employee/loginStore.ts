import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface EmployeeState {
  username: string
  password: string
  email: string
  permissions: string[]
}

const initialState: EmployeeState = {
  username: "",
  password: "",
  email: "",
  permissions: [],
}

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setFieldValue<T extends keyof EmployeeState>(
      state: EmployeeState,
      action: PayloadAction<{ field: T; value: EmployeeState[T] }>
    ) {
      const { field, value } = action.payload
      state[field] = value
    },

    setState(_state, action: PayloadAction<EmployeeState>) {
      return { ...action.payload }
    },

    clearState(_state) {
      return { ...initialState }
    },
  },
})

export const { setFieldValue, clearState, setState } = employeeSlice.actions
export default employeeSlice.reducer
