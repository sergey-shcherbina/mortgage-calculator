import {$authHost, $host} from "."
import jwt_decode from "jwt-decode"


export const signUp = async (email, password, name) => {
  const {data} = await $host.post("api/user/sign_up", {email, password, name})
  localStorage.setItem("token", data.token)
  return jwt_decode(data.token)
}
export const signIn = async (email, password) => {
  const {data} = await $host.post("api/user/sign_in", {email, password})
  localStorage.setItem("token", data.token)
  return jwt_decode(data.token)
}
export const check = async () => {
  const {data} = await $authHost.get("api/user/auth")
  localStorage.setItem("token", data.token)
  return jwt_decode(data.token)
}
