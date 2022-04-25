import firebase from "firebase"
import { gameType, characterType } from "../models/types"
import { db } from "./firebaseServ"


export const gameConverter: firebase.firestore.FirestoreDataConverter<gameType> = {
    toFirestore: (data: gameType) => data,
    fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
        snap.data() as gameType
}

export const charConverter: firebase.firestore.FirestoreDataConverter<characterType> = {
    toFirestore: (data: characterType) => data,
    fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
        snap.data() as characterType
}

export const gameDocRef = (guildId: string) => {
    return db
        .collection('games')
        .doc(guildId)
        .withConverter(gameConverter)
}

export const charColRef = (guildId: string) => {
    return db
        .collection('games')
        .doc(guildId)
        .collection('characters')
        .withConverter(charConverter)
}
export const charDocRef = (guildId: string, charId: string) => {
    return db
        .collection('games')
        .doc(guildId)
        .collection('characters')
        .withConverter(charConverter)
        .doc(charId)
}