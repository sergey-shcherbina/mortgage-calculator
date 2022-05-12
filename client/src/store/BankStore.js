import { makeAutoObservable } from "mobx"

export default class BankStore {
  constructor() {
    this._banks = []
    this._selectedBank = {}
    makeAutoObservable(this)
  }
  setBanks(banks) {
    this._banks = banks
  }
  setSelectedBank(selectedBank) {
    this._selectedBank = selectedBank
  }
  get banks() {
    return this._banks
  }
  get selectedBank() {
    return this._selectedBank
  }
}

