import express from "express";
import { SearchController } from "../controllers/search.controller";
import { verifyJWT } from "../auth/guards/jwt-auth.guard";

const router = express.Router();

router.get("/",verifyJWT, [SearchController.search]);
router.get("/personal",verifyJWT, [SearchController.personalSearch]);

export default router;
