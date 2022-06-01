import styles from '../styles/output.module.scss'
import {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {UserStatus} from "./state";
import {LCgetOutput} from "./dbUtils";
import Image from "next/image";
import {Simulate} from "react-dom/test-utils";
import mouseDown = Simulate.mouseDown;
import {useRouter} from "next/router";

export interface posInfo {
    posID: number,
    time: number,
    isArea: boolean
}

export interface Output {
    userType: number,
    nickName: string,
    v1: number,
    v2: number,
    v3: number,
    userText: string[],
    posData: posInfo[],
    word1: string,
    word2: string,
    // posData:
}

export default function Output() {
    const userState = useRecoilValue(UserStatus)
    const [outputVal, setOutputVal] = useState<Output>()
    const router = useRouter()
    useEffect(() => {

        (async () => {
            const a = await LCgetOutput(userState.RFID)
            console.log(a.userText)
            setOutputVal(await LCgetOutput(userState.RFID))
            setOutputVal(a)
        })()

    }, [])
    return (
        <div className={styles.output}>
            <div className={styles.iconBar}>
                <div className={styles.icon}>
                    <Image src={require("/public/output/icon.png")} alt={"icon"}/>
                </div>
                <div className={styles.uid}>
                    {`ID:${userState.RFID}`}
                </div>
            </div>

            <div className={styles.nickName}>
                <div className={styles.line1}>
                    原来是你！
                </div>
                <div className={styles.mainNickName}>
                    {`"${outputVal?.nickName},"`}
                </div>
                <div className={styles.line3}>
                    你的观展轨迹带领你
                </div>
            </div>

            <div className={styles.routeMap}>
                <Image src={require("/public/output/shencheng.png")} alt={'sc'}/>
            </div>


            {/*<div className={styles.music}>*/}
            {/*    <div className={styles.musicinfo}>*/}
            {/*        <Image src={require("/public/output/musicinfo.png")} alt={"musicinfo"}/>*/}
            {/*    </div>*/}
            {/*    <div className={styles.musicArea}*/}
            {/*         style={{backgroundImage: `url(${require("/public/output/imgBg.png").default.src})`}}>*/}
            {/*        <Image src={require("/public/output/play.png")} alt={"musicc"}/>*/}
            {/*    </div>*/}
            {/*</div>*/}


            <div className={styles.vChart}>
                <div className={styles.title}>
                    <Image src={require("/public/output/vchatTitle.png")} alt={"title"}/>
                </div>

                <div className={styles.culture}>
                    <div className={styles.l}>
                        经典力
                    </div>

                    <div className={styles.middleBar}>
                        <div className={styles.titleContainer}>
                            <div className={styles.titleword}>文化演绎</div>
                        </div>

                        <div className={styles.barContainer}>
                            <div className={styles.barl} style={{opacity: outputVal?.v1! > 0 ? "1" : "0"}}>
                                <Image src={require("/public/output/arrorl.png")} alt={"arr"}/>
                                <div className={styles.bar} style={{width: `${150 * outputVal?.v1!}px`}}></div>
                            </div>
                            <div className={styles.barr} style={{opacity: outputVal?.v1! < 0 ? "1" : "0"}}>
                                <div className={styles.bar} style={{width: `${150 * outputVal?.v1!}px`}}></div>
                                <Image src={require("/public/output/arrorr.png")} alt={"arr"}/>
                            </div>
                        </div>
                    </div>

                    <div className={styles.r}>
                        先锋力
                    </div>

                </div>

                <div className={styles.story}>
                    <div className={styles.l}>
                        特写力
                    </div>
                    <div className={styles.middleBar}>
                        <div className={styles.titleContainer}>
                            <div className={styles.titleword}>人间故事</div>
                        </div>
                        <div className={styles.barContainer}>
                            <div className={styles.barl} style={{opacity: outputVal?.v2! > 0 ? "1" : "0"}}>
                                <Image src={require("/public/output/arrorl.png")} alt={"arr"}/>
                                <div className={styles.bar} style={{width: `${150 * outputVal?.v2!}px`}}></div>
                            </div>
                            <div className={styles.barr} style={{opacity: outputVal?.v2! < 0 ? "1" : "0"}}>
                                <div className={styles.bar} style={{width: `${150 * outputVal?.v2!}px`}}></div>
                                <Image src={require("/public/output/arrorr.png")} alt={"arr"}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.r}>
                        群像力
                    </div>
                </div>

                <div className={styles.think}>
                    <div className={styles.l}>
                        跳跃力
                    </div>

                    <div className={styles.middleBar}>
                        <div className={styles.titleContainer}>
                            <div className={styles.titleword}>思维核力</div>
                        </div>
                        <div className={styles.barContainer}>
                            <div className={styles.barl} style={{opacity: outputVal?.v3! > 0 ? "1" : "0"}}>
                                <Image src={require("/public/output/arrorl.png")} alt={"arr"}/>
                                <div className={styles.bar} style={{width: `${150 * outputVal?.v3!}px`}}></div>
                            </div>
                            <div className={styles.barr} style={{opacity: outputVal?.v3! < 0 ? "1" : "0"}}>
                                <div className={styles.bar} style={{width: `${150 * outputVal?.v3!}px`}}></div>
                                <Image src={require("/public/output/arrorr.png")} alt={"arr"}/>
                            </div>
                        </div>


                    </div>

                    <div className={styles.r}>
                        聚合力
                    </div>
                </div>

            </div>


            <div className={styles.text}>
                {outputVal?.userText}
            </div>


            <div className={styles.message}>
                <div className={styles.messageTitle}>
                    <Image src={require("/public/output/messageTitle.png")} alt={"title"}/>
                </div>

                <div className={styles.content}>
                    <Image src={require("/public/output/messageUnKonw.png")} alt={"message"}/>
                </div>
            </div>


            <div className={styles.contact} onClick={() => {
                router.push("https://drafff.art")
            }}>
                <Image src={require("/public/output/concat.png")} alt={"a"}/>
            </div>


        </div>
    )
}