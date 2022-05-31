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