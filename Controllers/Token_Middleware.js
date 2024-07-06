const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (authHeader == null) return res.sendStatus(401);

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401); 

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;