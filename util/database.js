import { MongoClient } from 'mongodb'

const url = process.env.MONGODB_URI

// 환경 변수 검증
if (!url) {
  throw new Error('MONGODB_URI environment variable is not defined')
}

const options = { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
}

let connectDB

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect()
}

// MongoDB 클라이언트 인스턴스도 export (Adapter용)
let client
if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(url, options)
  }
  client = global._mongoClient
} else {
  client = new MongoClient(url, options)
}

export { connectDB, client }