const functions = require("firebase-functions")
const next = require("next")
const express = require("express")

var app, handle, server

// FIXME: Firebase deploy command tries to load the code, causing an error,
// so, we delay app initialization
if (!/\/tmp/.test(__dirname)) {
  // NOTE: Dev mode doesn't work like a charm :/
  // (Same problem reported at https://github.com/zeit/next.js/issues/2123)
  app = next({ dev: false, conf: { assetPrefix: "/next", distDir: "next" } })
  handle = app.getRequestHandler()

  app.prepare().then(() => {
    server = express()

    server.get("_next/*", (req, res) => {
      console.log("next")
      return handle(req, res)
    })

    server.get("_webpack/*", (req, res) => {
      console.log("webpack")
      return handle(req, res)
    })

    server.get("*", (req, res) => {
      return handle(req, res)
    })
  })
}

exports.next = functions.https.onRequest(server)
// exports.next = functions.https.onRequest((req, res) => {
//   return app.prepare().then(() => handle(req, res))
// })
