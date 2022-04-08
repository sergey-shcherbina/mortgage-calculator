import {makeAutoObservable} from "mobx"

export default class Store {
  constructor() {
    this._isAuth = false
    this._user = {}
    this._banks = []
    this._selectedBank = {}
    makeAutoObservable(this)
  }
  setIsAuth(bool) {
    this._isAuth = bool
  }
  setUser(user) {
    this._user = user
  }
  setBank(banks) {
    this._banks = banks
  }
  setSelectedBank(selectedBank) {
    this._selectedBank = selectedBank
  }
  get isAuth() {
    return this._isAuth
  }
  get user() {
    return this._user
  }
  get banks() {
    return this._banks
  }
  get selectedBank() {
    return this._selectedBank
  }
}
