import * as functions from "firebase-functions"

import * as nextApp from "./next/app"
import * as helloWorld from "./helloworld/helloWorld"

exports.app = {
  app: functions.https.onRequest(nextApp),
  // funcs to be deployed with the frontend
}

exports.otherFuncs = {
  helloWorld: functions.https.onRequest(helloWorld),
  // other funcs
}
