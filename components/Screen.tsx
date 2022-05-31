import styles from '/styles/id.module.scss'
import {useRecoilState, useRecoilValue} from "recoil";
import {SelectWords, UserStatus} from "./state";
import {FC, Ref, useEffect, useRef, useState} from "react";
import mqtt from "mqtt"
import Image from "next/image";
import {worditem, wordState} from '../pages/api/getwords';
import {useRouter} from "next/router";
import {LCsetSelectWord} from "./dbUtils";
import { gsap ,Power4} from "gsap";
interface SelectWord {
    word1: string,
    word2: string
}

enum SelectState {
    word1,
    word2,
    none
}

export default function Screen() {
    const router = useRouter()
    const userState = useRecoilValue(UserStatus)
    const [words, setWords] = useState<worditem[][]>([])
    let client = useRef<mqtt.Client | null>(null)
    const [selectWord, setSelectWord] = useRecoilState(SelectWords)
    const [selectState, setSelectState] = useState<SelectState>(SelectState.word1)
    const word1Ref = useRef<HTMLDivElement>(null)
    const word2Ref = useRef<HTMLDivElement>(null)
    const handleLaunch = () => {
        if (selectWord.word1 !== "" && selectWord.word2 !== "") {
            client.current?.publish("word/create", JSON.stringify({
                word: selectWord.word1,
                type: 0,
                id: userState.RFID
            }))
            client.current?.publish("word/create", JSON.stringify({
                word: selectWord.word2,
                type: 1,
                id: userState.RFID
            }))
            LCsetSelectWord(userState.RFID, selectWord.word1, selectWord.word2);

            gsap.to(word1Ref.current,{y:-200,ease:Power4.easeIn})
            gsap.to(word2Ref.current,{y:-300,ease:Power4.easeIn})
            setTimeout(()=>{

            router.push("/game")
            },1000)

        } else {
            alert("请选择你的生活力")
        }
    }
    useEffect(() => {
        (async () => {
            const wordslist = await fetch("./api/getwords").then(d => d.text()).then(d => JSON.parse(d))
            setWords(wordslist)
        })()
        const options = {
            clean: true,
            clientId: new Date().toString(),
            username: "admin",
            password: "public",
            reconnectPeriod: 1000,
            connectTimeout: 30 * 1000,
        };
        client.current = mqtt.connect("ws://zstu-interaction.art:8083/mqtt", options);
        client.current.on("error", error => {
            console.log("连接失败:", error);
        });
        setSelectWord({word2: "", word1: ""})
        // console.log(wordListRefs)
    }, [])
    const calcolor = (ws: wordState) => {
        if (ws === wordState.word1) {
            return styles.word1
        } else if (ws === wordState.word2) {
            return styles.word2
        } else {
            return ""
        }
    }
    const calc = (word: string) => {
        // console.log(selectState)
        // @ts-ignore

        if (selectState === SelectState.none) {
            setSelectWord((e) => (
                {
                    word1: e.word1,
                    word2: e.word2
                }
            ))

        } else if (selectState === SelectState.word1) {
            setSelectState(SelectState.none)
            console.log(word1Ref)

            if (word.length === 4) {
                word1Ref.current!.style.fontSize = "1.5rem";
                word1Ref.current!.style.letterSpacing = "3px";
                word1Ref.current!.style.transform = "translateX(18px) translateY(-50px)";

            } else if (word.length === 3) {
                word1Ref.current!.style.fontSize = "2rem";
                word1Ref.current!.style.letterSpacing = "3px";
                word1Ref.current!.style.transform = "translateX(18px) translateY(-53px)";

            } else if (word.length === 2) {
                word1Ref.current!.style.fontSize = "2rem";
                word1Ref.current!.style.letterSpacing = "10px";
                word1Ref.current!.style.transform = "translateX(30px) translateY(-53px)";

            }
            setSelectWord((e) => (
                {
                    word1: word,
                    word2: e.word2
                }
            ))
        } else if (selectState === SelectState.word2) {
            setSelectState(SelectState.none)

            if (word.length === 4) {
                word2Ref.current!.style.fontSize = "1.5rem";
                word2Ref.current!.style.letterSpacing = "3px";
                word2Ref.current!.style.transform = "translateX(18px) translateY(-50px)";

            } else if (word.length === 3) {
                word2Ref.current!.style.fontSize = "2rem";
                word2Ref.current!.style.letterSpacing = "3px";
                word2Ref.current!.style.transform = "translateX(18px) translateY(-53px)";

            } else if (word.length === 2) {
                word2Ref.current!.style.fontSize = "2rem";
                word2Ref.current!.style.letterSpacing = "10px";
                word2Ref.current!.style.transform = "translateX(30px) translateY(-53px)";

            }
            setSelectWord((e) => (
                {
                    word1: e.word1,
                    word2: word,
                }
            ))
        }
        console.log(word.length)
        if (selectState !== SelectState.none) {
            setWords((w) => (
                w.map(e => (
                    e.map(ee => {
                        if (selectState === SelectState.word1) {
                            if (ee.word === word) {
                                return new worditem(word, wordState.word1)
                            } else {
                                if (ee.state === wordState.word2) {
                                    return new worditem(ee.word, wordState.word2)
                                }
                                return new worditem(ee.word, wordState.none)
                            }
                        } else if (selectState === SelectState.word2) {
                            if (ee.word === word) {
                                return new worditem(word, wordState.word2)
                            } else {
                                if (ee.state === wordState.word1) {
                                    return new worditem(ee.word, wordState.word1)
                                }
                                return new worditem(ee.word, wordState.none)
                            }
                        } else {
                            // alert("请先选择生活态")
                            return ee
                        }
                    })
                ))
            ))
        }

    }
    return (
        <div className={styles.screen}>

            <div className={styles.select}>
                <Image src={require("/public/screen/jrxd.png")} alt={"shenghuoli"}/>
            </div>
            <div className={styles.wordTitle}>
                <div className={styles.titleImage}>
                    <Image src={require("/public/screen/jiaruxindequ.png")} alt={"shenghuoli"}/>
                </div>
                <div className={styles.wordSelect}>
                    <div className={styles.word1} onClick={() => {
                        setSelectState(SelectState.word1)
                        setSelectWord(w => ({
                            word1: "",
                            word2: w.word2
                        }))
                    }}>
                        <Image1Selector state={selectState}/>
                        <div className={styles.tip}>
                            <Image src={require("/public/screen/changeword.png")} alt={"tip"}/>
                        </div>
                        <div className={styles.text} ref={word1Ref}>
                            {selectWord.word1}
                        </div>
                    </div>
                    <div className={styles.word2} onClick={() => {
                        setSelectState(SelectState.word2)
                        setSelectWord(w => ({
                            word2: "",
                            word1: w.word1
                        }))
                    }}>

                        <Image2Selector state={selectState}/>
                        <div className={styles.tip}>
                            <Image src={require("/public/screen/changeword.png")} alt={"tip"}/>
                        </div>
                        <div className={styles.text} ref={word2Ref}>
                            {selectWord.word2}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.words}>
                {
                    words.map((wordlist: worditem[], wi) => {
                        const item = wordlist.map((e, i) => {
                            return (
                                <span key={i}>
                                    <span onClick={() => {
                                        calc(e.word)
                                    }} className={`${styles.wordNormal} ${calcolor(e.state)}`}
                                    >{e.word}</span>
                                    <span>{` / `}</span>
                                </span>
                            )
                        })
                        return (<div key={wi} className={styles.wordList}>
                            {item}
                        </div>)
                    })}
            </div>
            <div className={styles.launch}>
                <div className={styles.pushable} onClick={() => {
                    handleLaunch()
                }} style={{backgroundImage: `url(${require("/public/screen/button-back.png").default.src})`}}>
                    <span className={styles.front}
                          style={{backgroundImage: `url(${require("/public/screen/button-top.png").default.src})`}}>
                        加入
                    </span>
                </div>
            </div>
        </div>
    )
}


interface WordListProps {
    list: string[],
    myKey: number,
    ref: Ref<HTMLDivElement>
}

const WordList: FC<WordListProps> = ({list, myKey, ref}) => {
    return (
        <div className={styles.wordList} key={myKey} ref={ref}>
            {list.map((e, i) => {
                return (
                    <span key={i} className={styles.wordItem}>
                        <span onClick={(e) => {
                            const el = e.target as HTMLElement
                            // console.log(el.innerText!)
                        }}>{e}</span>
                        <span>{` / `}</span>
                    </span>
                )
            })}
        </div>
    )
}

interface WordDispProp {
    e: worditem,
    i: number
}


interface imageSelect {
    state: SelectState
}

const Image1Selector: FC<imageSelect> = ({state}) => {
    if (state !== SelectState.word1) {
        return <Image src={require("/public/screen/pink.png")} alt={"sd"}/>
    } else {
        return <Image src={require("/public/screen/pinkk.png")} alt={"sd"}/>
    }
}

const Image2Selector: FC<imageSelect> = ({state}) => {
    if (state !== SelectState.word2) {
        return <Image src={require("/public/screen/puurple.png")} alt={"sd"}/>
    } else {
        return <Image src={require("/public/screen/purple.png")} alt={"sd"}/>
    }
}
