import {atom} from "recoil";
import { UserState } from "./dbUtils";

// import words from "/public/"

export const LCInitState = atom({
    key: 'LCInitState',
    default: false
})


export const UserStatus = atom({
    key: 'UserStatus',
    default: {} as UserState
})

export const SelectWords = atom({
    key:"SelectWords",
    default:{ word1: "", word2: "" }
})