// import LC from "leancloud-storage";
import AV from "leancloud-storage"
import {useRecoilState} from "recoil";
import {LCInitState} from "./state";

export function LCInit() {
    AV.init({
        appId: '8MEtrBGXmxtCE52pGqndGpla-gzGzoHsz',
        appKey: 'LuBCjDXGdjPV1C7XpfpwkmUr',
        serverURL: 'https://8metrbgx.lc-cn-n1-shared.com'
    });
}

export interface UserState {
    lcID: string | undefined,
    isStart: boolean,
    isFinished: boolean,
    isMusicFinished: boolean,
    RFID:string
}

export async function LCgetUserStartStatus(userRFID: string): Promise<UserState> {
    const RFID_Query = new AV.Query("RFID_LIST")
    RFID_Query.equalTo("RFID", userRFID)
    const query = await RFID_Query.first()
    const userState: UserState = {
        lcID: query!.id,
        isStart: query!.get("isStart"),
        isFinished: query!.get("isFinished"),
        isMusicFinished: query!.get("isMusicFinished"),
        RFID:query!.get("RFID")
    }
    return userState
}

export async function setUserStartStatus(userRFID: string) {
    // const obj = AV.Object.createWithoutData("RFID_LIST",)
    // const r = new obj()

}

export async function LCsetUserState(id: string, stateName: string, state: boolean) {
    console.log(id)
    const obj = AV.Object.createWithoutData("RFID_LIST", id)
    obj.set(stateName, state)
    await obj.save()
}