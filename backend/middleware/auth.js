const jwt = require('jsonwebtoken');

// Vérification du JWT
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Token manquant' });

  jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'supersecret', (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token invalide' });
    req.user = decoded;
    next();
  });
};

// Vérification rôle admin
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ error: 'Accès réservé à l\'administrateur' });
};

// Vérification rôle employé
exports.isEmploye = (req, res, next) => {
  if (req.user && req.user.role === 'employe') return next();
  return res.status(403).json({ error: 'Accès réservé à l\'employé' });
};

// Vérification utilisateur standard
exports.isUser = (req, res, next) => {
  if (req.user && req.user.role === 'utilisateur') return next();
  return res.status(403).json({ error: 'Accès réservé à l\'utilisateur' });
};
