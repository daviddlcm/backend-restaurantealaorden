var admin = require("firebase-admin");

var serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS

if (!serviceAccount) {
  console.error('ERROR: No se encontró la variable GOOGLE_APPLICATION_CREDENTIALS');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccount))
});

module.exports = admin.messaging()


// var serviceAccount = requires("../../archivojson.json")

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
