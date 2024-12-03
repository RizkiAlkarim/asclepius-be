import ClientError from "./client-error.js"

export default class InputError extends ClientError {
    constructor(message){
        super(message)
        this.name = 'InputError'
    }
}