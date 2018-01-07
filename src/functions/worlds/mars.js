import * as functions from "firebase-functions"

const mars = functions.https.onRequest((request, response) => {
  response.send("Hello from Mars!")
})

export { mars }
