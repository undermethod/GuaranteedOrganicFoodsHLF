const jwt = require('jsonwebtoken');

// for production, passwords would be encrypted and moved to DB or otherwise not in plain text
let users = {
  producer: { password: 'producerpw' },
  packager: { password: 'packagerpw' },
  exporter: { password: 'exporterpw' },
  shipper: { password: 'shipperpw' },
  importer: { password: 'importerpw' },
  distributor: { password: 'distributorpw' },
  retailer: { password: 'retailerpw' }
};

exports.authLogin = (req, res) => {
  let un = req.body.username;
  let pw = req.body.password;

  if(!un || !pw || !users[un]) {
    return res.json({ error: 'Invalid user' });
  }

  if(users[un].password !== pw) {
    return res.status(401).send({ error: 'Invalid password' }); // Unauthorized
  }

  let payload = { username: un };
  let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: process.env.ACCESS_TOKEN_LIFE
  });
  let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: process.env.REFRESH_TOKEN_LIFE
  });
  users[un].refreshToken = refreshToken;

  console.log(`User '${un}' logged in`);

  res.cookie('jwt', accessToken, { httpOnly: true /*, secure: true*/ }); // "secure" if HTTPS
  res.json({ loggedinuser: un });
};

exports.authRefresh = (req, res) => {
  let accessToken = req.cookies.jwt;

  if(!accessToken) {
    return res.status(403).send(); // Forbidden
  }

  let payload;
  try {
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
  } catch(err) {
    console.error('Error in authentication authRefresh():', err);
    return res.status(401).send(); // Unauthorized
  }

  let refreshToken = users[payload.username].refreshToken;
  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch(err) {
    console.error('Error in authentication authRefresh():', err);
    return res.status(401).send(); // Unauthorized
  }

  // refreshToken verified, renew access
  let newToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: process.env.ACCESS_TOKEN_LIFE
  });

  res.cookie('jwt', newToken, { httpOnly: true /*, secure: true*/ }); // "secure" if https
  res.send();
};

exports.authVerify = (req, res, next) => {
  let accessToken = req.cookies.jwt;

  if(!accessToken) {
    return res.status(403).send(); // Forbidden
  }

  let payload;
  try {
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch(err) {
    console.error('Error in authentication authVerify():', err);
    return res.status(401).send(); // Unauthorized
  }
};
