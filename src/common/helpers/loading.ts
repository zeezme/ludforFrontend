import { setLoading } from "../../config/globalStore"
import { store } from "../../config/store"

class Loading {
  private dispatch = store.dispatch

  start() {
    this.dispatch(setLoading(true))
  }

  stop() {
    this.dispatch(setLoading(false))
  }
}

export default new Loading()
