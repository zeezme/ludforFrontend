import api from "./api"

class TokenHelper {
  async validate(token: string) {
    const response = await api({
      endpoint: `verify-token`,
      method: "POST",
      data: { token },
    })

    return response
  }
}

export default new TokenHelper()
