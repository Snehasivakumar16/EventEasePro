import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token)
    return res.status(401).json({ message: 'No token, access denied' });

  try {
    const verified = jwt.verify(token, 'secretkey123');
    req.user = verified;
    next();
  } catch {
    res.status(400).json({ message: 'Invalid token' });
  }
};
