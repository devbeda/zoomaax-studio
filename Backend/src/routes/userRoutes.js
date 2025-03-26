import express, { Router } from "express";
import { getAllCasting, getAllContent, getAllEvents, getAllNews, getAllTeams, getContentById, getEventById, getNews } from "../controlles/upload.controllers.js";

const router = Router()

router.get("/getcontent",getAllContent)
router.get("/getnews", getAllNews)
router.get("/getcontent/:id", getContentById)
router.get("/getnews/:id", getNews)
router.get("/getallevents", getAllEvents)
router.get("/getevent/:id", getEventById)
router.get("/getallcasting", getAllCasting);
router.get("/getallteam", getAllTeams);

export default router