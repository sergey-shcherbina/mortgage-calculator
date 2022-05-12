import {$authHost, $host} from "."

export const createBank = async (bank) => {
  const {data} = await $authHost.post("api/bank", bank)
  return data
}
export const editBank = async (id, bank) => {
  const {data} = await $authHost.put("api/bank/" + id, bank)
  return data
}
export const fetchBanks  = async (userId) => {
  const {data} = await $host.get("api/bank", {params: {userId}})
  return data
}
export const removeBank  = async (id) => {
  const {data} = await $authHost.delete("api/bank/" + id)
  return data 
}
