import express from "express";
import { checkSession, destroySession } from "../Controllers/apiController.js";

export const router=express.Router();
console.log("apiRoutes");
router.get('/checkSession',checkSession)
router.post('/destroySession',destroySession);