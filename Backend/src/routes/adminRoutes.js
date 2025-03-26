import express from "express";
import { addCasting, addTeam, deleteCasting, deleteContent, deleteEvent, deleteNews, deleteTeam, getAllCasting, getAllContent, getAllEvents, getAllNews, getAllTeams, getCastById, getContentById, getEventById, getNews, getTeamById, updateCasting, updateContent, updateEvent, updateNews, updateTeam, uploadContent, uploadEvent, uploadNews } from "../controlles/upload.controllers.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = express.Router();

router.post("/uploadcontent", upload.fields([
    {name: "thumbnail", maxCount: 1},
    {name: "images"},
    {name:"video"}
]),
uploadContent
)
router.get("/getcontent",getAllContent)
router.get("/getcontent/:id", getContentById)
router.post("/uploadnews",upload.array("images"), uploadNews)
router.get("/getallnews", getAllNews)
router.put("/updatecontent/:id",upload.fields([
    {name: "thumbnail", maxCount: 1},
    {name: "video", maxCount:1},
    {name: "images"}
]), updateContent)
router.put("/updatenews/:id",upload.array("newImages"), updateNews)
router.delete("/deletecontent/:id", deleteContent)
router.delete("/deletenews/:id", deleteNews)
router.get("/getnews/:id", getNews)

// event route
router.post("/uploadevent",upload.single("thumbnail"), uploadEvent)
router.get("/getallevents", getAllEvents)
router.get("/getevent/:id", getEventById)
router.delete("/deletevent/:id", deleteEvent)
router.put("/updatevent/:id", upload.single("thumbnail") ,updateEvent)

// casting route
router.post("/addcasting", upload.single("image"), addCasting);
router.get("/getallcasting", getAllCasting);
router.get("/getcast/:id", getCastById);
router.put("/updatecast/:id", upload.single("image"), updateCasting);
router.delete("/deletecast/:id", deleteCasting);

// Ourteam Route
router.post("/addteam", upload.single("image"), addTeam);
router.get("/getallteam", getAllTeams);
router.get("/getteam/:id",getTeamById)
router.put("/updateteam/:id", upload.single("image"), updateTeam);
router.delete("/deleteteam/:id", deleteTeam);

export default router;