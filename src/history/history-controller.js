import getAllHistory from "./history-service.js"

export default async function historyHandler(request, h){
    const data = await getAllHistory()
    const response = h.response(data)
    response.code(200)
    return response
}