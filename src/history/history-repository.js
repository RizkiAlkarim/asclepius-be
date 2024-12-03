import db from '../libs/db.js'

export default async function getHistories(){
    const result = await db.collection('predictions').get()
    return result
}