import mongoose from 'mongoose'

const connectionDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_ACCESS, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    const url = `${connection.connection.host}:${connection.connection}`
    console.log(`MongoDB conectado en: ${url}`)
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

export default connectionDB
