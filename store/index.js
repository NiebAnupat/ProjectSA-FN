import Cookies from "js-cookie";
import CookieParser from "cookieparser";

export const actions = {

  async nuxtServerInit({ commit }, { req }) {
    let token = null;
    if (req.headers.cookie) {
      const parsed = CookieParser.parse(req.headers.cookie);
      try {
        token = parsed.token;
      } catch (err) {
        // No valid cookie found
      }
    }
    if (token) {
      // auth token
      await this.$axios.$post("auth/auth", { token }).then((res) => {
        if (res) {
          commit("Auth/setUser", res);
          commit("Auth/setAdmin", res.DP_ID === 2);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }

}
