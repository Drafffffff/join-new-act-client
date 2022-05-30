import LC from "leancloud-storage";

function init() {

}


export async function getUserStartStatus(userRFID: string): Promise<boolean> {
    LC.init({
        appId: '8MEtrBGXmxtCE52pGqndGpla-gzGzoHsz',
        appKey: 'LuBCjDXGdjPV1C7XpfpwkmUr',
        serverURL: 'https://8metrbgx.lc-cn-n1-shared.com'
    });
    const RFID_Query = new LC.Query("RFID_LIST")
    RFID_Query.equalTo("RFID", userRFID)
    const query = await RFID_Query.first()
    return query!.get("isStart") as boolean
}