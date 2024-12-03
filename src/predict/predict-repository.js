import db from '../libs/db.js'

export default async function savePrediction(id, result, suggestion, createdAt){
    const data = await db.collection('predictions').doc(id).set({id, result, suggestion, createdAt})
    return data
}