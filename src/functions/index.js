// const functions = require("firebase-functions")
// const helloWorld = require("./helloworld/helloWorld")
// const next = require("./nextApp/nextApp")

// exports.helloworld = functions.https.onRequest((req, res) => {
//   helloWorld.helloWorld(req, res)
// })

// exports.next = functions.https.onRequest((req, res) => {
//   next.next(req, res)
// })

const functions = require("firebase-functions")
const nextApp = require("next")

var dev = process.env.NODE_ENV !== "production"
var app = nextApp({ dev, conf: { distDir: "next" } })
var handle = app.getRequestHandler()

exports.next = functions.https.onRequest((req, res) => {
  console.log("File: " + req.originalUrl) // log the page.js file that is being requested
  return app.prepare().then(() => handle(req, res))
})

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!")
})
