import * as functions from "firebase-functions"

const jupiter = functions.https.onRequest((request, response) => {
  response.send("Hello from Jupiter!")
})

export { jupiter }
