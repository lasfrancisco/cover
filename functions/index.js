const functions = require('firebase-functions');
const firestore = require('@google-cloud/firestore');

// Require cors allowing cross origin resource sharing @see{https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS}
const cors = require('cors')({ origin: true });

const store = new firestore({
  projectId: 'cover-pizza',
  timestampsInSnapshots: true,
});


exports.subscribe = functions.https.onRequest( (req, res) => {
  
  if(req.method !== 'PUT') { return res.status(405).end(); }

  // Allows the broswer to handle cross reference sharing 
  return cors(req, res, () => {

    console.log(req);

    const email = req.body && req.body.email;
  
    if(!email) { return res.status(400).end(); }

    const country = req.body && req.body.country;
    const city = req.body && req.body.city;

    return store.collection('subscribers')
      
      .add({ email, country, city })
      
      .then(doc => res.status(200).send(doc))
      
      .catch(err => {
        console.error(err);
        return res.status(404).send({ error: 'unable to subscribe', err });
      });
    });
});