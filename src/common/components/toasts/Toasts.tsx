import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Toast, ToastBody } from "reactstrap"
import { RootState } from "../../../config/store"
import { removeToast } from "../../../config/globalStore"

const ToastProvider: React.FC = () => {
  const dispatch = useDispatch()
  const toasts = useSelector((state: RootState) => state.global.toasts)

  useEffect(() => {
    const toastTimers = toasts.map((toast) => {
      return setTimeout(() => {
        dispatch(removeToast(toast.id))
      }, 3000)
    })

    return () => {
      toastTimers.forEach(clearTimeout)
    }
  }, [toasts, dispatch])

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 1050,
        maxWidth: "300px",
      }}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          className={`text-white ${
            toast.type === "success" ? "bg-success" : "bg-danger"
          }`}
          style={{ marginBottom: "10px", cursor: "pointer", opacity: 0.9 }}
          onClick={() => dispatch(removeToast(toast.id))}
        >
          <ToastBody>{toast.message}</ToastBody>
        </Toast>
      ))}
    </div>
  )
}

export default ToastProvider
