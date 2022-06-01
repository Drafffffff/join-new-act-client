// import LC from "leancloud-storage";
import AV from "leancloud-storage"
import {useRecoilState} from "recoil";
import {LCInitState} from "./state";
import exp from "constants";
import {Output, posInfo} from "./Output";

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
    RFID: string
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
        RFID: query!.get("RFID")
    }
    return userState
}

export async function LCgetOutput(RFID: string) {
    const output = new AV.Query("generate")
    output.equalTo("RFID", RFID)
    const d = await output.first()
    const tmp = JSON.parse(d!.get("posData")) as number[][]
    const posItems = tmp.map((e,i)=>{
        return {
            posID:e[0],
            time:e[1],
            isArea:!!e[2]
        } as posInfo
    })

    const data: Output = {
        userType: d!.get("userType"),
        nickName: d!.get("nickName"),
        posData: posItems,
        userText: d!.get("userText"),
        v1: d!.get("v1"),
        v2: d!.get("v2"),
        v3: d!.get("v3"),
        word1: d!.get("word1"),
        word2: d!.get("word2"),
    }
    return data
}


export function LCsetSelectWord(userRFID: string, word1: string, word2: string) {
    const obj = AV.Object.extend('word_record');
    const r = new obj()

    r.set('RFID', userRFID);
    r.set('word1', word1);
    r.set('word2', word2);
    r.save().then((e) => {
        // 成功保存之后，执行其他逻辑
        console.log(`保存成功。objectId：${e.id}`);
    }, (error) => {

    });

}

export async function LCsetUserState(id: string, stateName: string, state: boolean) {
    console.log(id)
    const obj = AV.Object.createWithoutData("RFID_LIST", id)
    obj.set(stateName, state)
    await obj.save()
}


export function map(n: number, start1: number, stop1: number, start2: number, stop2: number, withinBounds?: boolean) {
    const newVal = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if (!withinBounds) {
        return newVal;
    }
    if (start2 < stop2) {
        return constrain(newVal, start2, stop2);
    } else {
        return constrain(newVal, stop2, start2);
    }
};


export function constrain(n: number, low: number, high: number) {
    return Math.max(Math.min(n, high), low);
};



