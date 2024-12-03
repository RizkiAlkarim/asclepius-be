import predictImage from "./predict-service.js"

export default async function predictHandler(request, h){
    const { image } = request.payload
    const { model } = request.server.app
    const data = await predictImage(model, image)
    const response = h.response(data)
    response.code(201)
    return response
}