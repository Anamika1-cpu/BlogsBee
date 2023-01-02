const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/database/dbConnect");
const { userRegister } = require("./controllers/user/userCntrl");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const userRoutes = require("./routes/user/userRoute");
const postRoutes = require("./routes/post/postRoute");
const commentRoutes = require("./routes/comment/commentRoute");
const emailRoutes = require("./routes/email/emailMsgRoute");
const categoryRoutes = require("./routes/category/categoryRoute");
const cors = require("cors");
dbConnect();

const app = express();
//middleware

app.use(express.json());
//cors
app.use(cors());
//user routes
app.use("/api/users", userRoutes);
//post routes
app.use("/api/posts", postRoutes);
//comment routes
app.use("/api/comments", commentRoutes);
//email routes
app.use("/api/email", emailRoutes);
//catgeory routes
app.use("/api/category", categoryRoutes);

//error Handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server is running on port ${PORT}`));
