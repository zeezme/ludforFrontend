import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface GlobalState {
  token: string | null
  permissions: string[]
  loading: boolean
  toasts: {
    message: string
    type: string
    id: number
  }[]
}

const initialState: GlobalState = {
  token: null,
  permissions: [],
  loading: false,
  toasts: [],
}

let toastId = 0

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload
    },
    setPermissions(state, action: PayloadAction<string[]>) {
      state.permissions = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    addToast(state, action: PayloadAction<{ message: string; type: string }>) {
      const newToast = {
        message: action.payload.message,
        type: action.payload.type as "success" | "error",
        id: toastId++,
      }

      state.toasts = [...state.toasts, newToast]
    },
    removeToast(state, action: PayloadAction<number>) {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload)
    },
    clearGlobalState(state) {
      state.token = null
      state.permissions = []
      state.toasts = []
    },
  },
})

export const {
  setToken,
  setPermissions,
  setLoading,
  removeToast,
  addToast,
  clearGlobalState,
} = globalSlice.actions

export default globalSlice.reducer
