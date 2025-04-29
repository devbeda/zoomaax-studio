import express from "express"
import { DBConnect } from "./src/database/DBConnect.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRoutes from "./src/routes/userRoutes.js"
import adminRoutes from "./src/routes/adminRoutes.js"

dotenv.config({})

const app = express()

app.use(
    cors({
        origin:"https://zoomaax-studio.vercel.app/",
        credentials:true
    })
)

const PORT = process.env.PORT || 7000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/api/v1/user", userRoutes)
app.use("/api/v1/admin", adminRoutes)

DBConnect()
.then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
.catch((error) => {
    console.error("cannot connect with server", error);
    process.exit(1)
})
