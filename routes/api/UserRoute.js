import express from "express";

const router = express.Router();

router.get("/test", (req, res) => res.json({Message: "Test route works!!!"}));


export default router;