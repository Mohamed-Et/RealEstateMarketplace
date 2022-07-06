const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ success: true, msg: 'Unauthorized access, no token provided!' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userID } = decoded;
    req.userID = userID;
    next();
  } catch (error) {
    return res.status(401).json({ success: true, msg: 'Unauthorized access!' });
  }
};

module.exports = authenticationMiddleware;
