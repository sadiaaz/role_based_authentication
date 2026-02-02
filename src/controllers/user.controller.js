export const userDashboard = (req, res) => {
  res.json({
    message: "Welcome User",
    userId: req.user.id,
    role: req.user.role,
  });
};

export const userProfile = (req, res) => {
  res.json({
    id: req.user.id,
    role: req.user.role,
  });
};
