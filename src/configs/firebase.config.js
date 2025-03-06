var admin = require("firebase-admin");

var serviceAccount = require("../../restaurante-a-la-orden-firebase-adminsdk-fbsvc-14fd214012.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
