const functions = require("firebase-functions")
const nextApp = require("next")

var dev = process.env.NODE_ENV !== "production"
var app = nextApp({ dev, conf: { distDir: "next" } })
var handle = app.getRequestHandler()

exports.next = functions.https.onRequest((req, res) => {
  console.log("File: " + req.originalUrl) // log the page.js file that is being requested
  return app.prepare().then(() => handle(req, res))
})
