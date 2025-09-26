import express from "express";
import { buyCorn } from "../controllers/buy-corn-controller.js";

const router = express.Router();

router.post("/", buyCorn);


export default router;
