import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer '))
      return res.status(401).json({ message: 'No token' });
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains id/email/role
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};

export const adminOnly = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  if (req.user.role !== 'admin')
    return res.status(403).json({ message: 'Admin only' });
  next();
};
