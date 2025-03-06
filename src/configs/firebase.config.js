var admin = require("firebase-admin");

var serviceAccount = require("../../"+process.env.FIREBASE_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
