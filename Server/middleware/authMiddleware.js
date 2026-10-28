import jwt from 'jsonwebtoken'
const jwtSecret = 'myjwtsecret'
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
     
    req.user = decoded;
    
    next();
  } catch (error) {
    // If token is expired or invalid, return an error
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default verifyToken