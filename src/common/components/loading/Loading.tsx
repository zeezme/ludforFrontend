import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../config/store"
import { Spinner } from "reactstrap"

const LoadingProvider: React.FC = () => {
  const loading = useSelector((state: RootState) => state.global.loading)

  return (
    loading && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1040,
        }}
      >
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1050,
            textAlign: "center",
          }}
        >
          <Spinner
            style={{ width: "3rem", height: "3rem" }}
            size="lg"
            color="light"
          />
        </div>
      </div>
    )
  )
}

export default LoadingProvider
