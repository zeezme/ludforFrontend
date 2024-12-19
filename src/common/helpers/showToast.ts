import { addToast } from "../../config/globalStore"
import { store } from "../../config/store"

class ShowToast {
  private dispatch = store.dispatch

  success(message: string) {
    this.dispatch(
      addToast({
        message,
        type: "success",
      })
    )
  }

  error(message: string) {
    this.dispatch(
      addToast({
        message,
        type: "error",
      })
    )
  }
}

export default new ShowToast()
