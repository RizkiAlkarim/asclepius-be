import historyHandler from "./history/history-controller.js"
import predictHandler from "./predict/predict-controller.js"

const routes = [
    {
        method: 'POST',
        path: '/predict',
        handler: predictHandler,
        options: {
          payload: {
            allow: 'multipart/form-data',
            multipart: true,
            maxBytes: 1000000
          }
        }
    },
    {
        method: 'GET',
        path: '/predict/histories',
        handler: historyHandler,
    }
]

export default routes