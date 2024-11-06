import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./utils/db.js"
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import JobRoute from "./routes/job.route.js"
import ApplicationRoute from "./routes/application.route.js"
import path  from "path";
dotenv.config({});
const app = express();
const _dirname=path.resolve();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "https://jobportal-e3t3.onrender.com",
  credentials: true,   
};

app.use(cors(corsOptions));
const port = process.env.PORT || 3000;
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",JobRoute);
app.use("/api/v1/application",ApplicationRoute)
app.use(express.static(path.join(_dirname,"/frontend/vite-project/dist")))
app.get("*",(_,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","vite-project","dist","index.html"))
})



app.listen(port, () => {
    ConnectDB();
  console.log(`server listening on ${port}`);
});
