import {predictCancerImage} from '../libs/ml.js'
import {v4 as uuid} from 'uuid';
import savePrediction from './predict-repository.js';

export default async function predictImage(model, image){
    const prediction = await predictCancerImage(model, image);
    const id = uuid()

    if(prediction > 0.5){
        const result = "Cancer"
        const suggestion = "Segera periksa ke dokter!"
        const createdAt = new Date().toISOString()
        try {
            await savePrediction(id, result, suggestion, createdAt)
        } catch(err){
            throw new Error('Something went wrong when saving to database')
        }

        return {
            status: "success",
            message: "Model is predicted successfully",
            data: {
                id,
                result,
                suggestion,
                createdAt
            }
        }
    }

    if(prediction <= 0.5){
        const result = "Non-cancer"
        const suggestion = "Penyakit kanker tidak terdeteksi."
        const createdAt = new Date().toISOString()
        try {
            await savePrediction(id, result, suggestion, createdAt)
        } catch(err){
            throw new Error('Something went wrong when saving to database')
        }

        return {
            status: "success",
            message: "Model is predicted successfully",
            data: {
                id,
                result,
                suggestion,
                createdAt
            }
        }
    }
}