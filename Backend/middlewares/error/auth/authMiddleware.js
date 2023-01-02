const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../../../models/user/User");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (req?.headers?.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        //find the user by id
        const user = await User.findById(decoded?.id).select("-password");
        //attaxh the user to the request
        req.user = user;
        next();
      } else {
        throw new Error("There is no token attach to the headers");
      }
    } catch (err) {
      // throw new Error("Not authorized token expired");
      res.json(err);
    }
  }
});

module.exports = authMiddleware;
