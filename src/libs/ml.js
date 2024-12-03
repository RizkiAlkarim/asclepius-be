import tf from '@tensorflow/tfjs-node';
import InputError from '../errors/input-error.js'

export async function loadModel() {
  const model = process.env.MODEL_URL;
  return tf.loadGraphModel(model);
}

export async function predictCancerImage(model, imageBuffer) {
  try {
    const tensor = tf.node
      .decodeJpeg(imageBuffer)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();
  
    const result = await model.predict(tensor).data()
    return result
  } catch(err){
      throw new InputError('Terjadi kesalahan dalam melakukan prediksi')
  }
}