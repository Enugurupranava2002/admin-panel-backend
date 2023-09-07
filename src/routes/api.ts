import express from "express";

import { authenticate } from "../controllers/user";
import auth from "../utils/auth";
import { data, getData } from "../controllers/data";

const router = express.Router();

router.post("/authenticate", authenticate);

router.post("/data", auth, data);

router.get("/data", auth, getData);

module.exports = router;
