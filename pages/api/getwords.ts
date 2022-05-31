// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import words from "../../public/words.json"
import {string} from "prop-types";

type Data = worditem[][]

export enum wordState {
    none,
    word1,
    word2
}

export class worditem {
    word: string;
    state: wordState;

    constructor(word: string, state: wordState) {
        this.word = word;
        this.state = state;
    }
    set(state: wordState) {
        this.state = state
    }
}

function getRandomArrayElements(arr: string[], count: number) {
    let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

function cutArray(array: worditem[], x: number, y: number) {
    const outArray = []
    for (let i = 0; i < x; i++) {
        const tmpArray = []
        for (let j = 0; j < y; j++) {
            tmpArray.push(array[i * y + j])
        }
        outArray.push(tmpArray)
    }
    return outArray
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const list = getRandomArrayElements(words, 120) as string[]
    const listt: worditem[] = list.map((e: string) => (new worditem(e,wordState.none)))
    res.status(200).json(cutArray(listt, 8, 15))
}



