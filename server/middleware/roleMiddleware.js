const verifyAdmin = (req, res, next) => {
  if (req.user.userType !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

const verifySubscriber = (req, res, next) => {
  if (req.user.userType !== "subscriber") {
    return res.status(403).json({ error: "Access denied. Subscribers only." });
  }
  next();
};

module.exports = { verifyAdmin, verifySubscriber };
