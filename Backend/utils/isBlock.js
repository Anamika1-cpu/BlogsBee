const blockUser = (user) => {
  if (user?.isBlocked) {
    throw new Error(`Access denied ${user?.firstName} is Blocked`);
  }
};

module.exports = blockUser;
