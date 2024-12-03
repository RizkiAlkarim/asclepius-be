import getHistories from './history-repository.js';

export default async function getAllHistory(){
    try {
        const result = await getHistories()
        let data = []
        result.forEach(doc => {
            data.push({
                id: doc.id,
                history: doc.data()
            })
        })
        return {
            status: "success",
            data
        }
    } catch(err){
        throw new Error('Something went wrong when connecting to database')
    }
}