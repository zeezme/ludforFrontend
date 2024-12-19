import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { persistor, store } from "./config/store.ts"
import { StrictMode } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Router from "./router/Router.tsx"
import ToastProvider from "./common/components/toasts/Toasts.tsx"
import LoadingProvider from "./common/components/loading/Loading.tsx"
import { PersistGate } from "redux-persist/integration/react"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider />
        <LoadingProvider />
        <Router />
      </PersistGate>
    </Provider>
  </StrictMode>
)

