import db from "../config/db.js";

const limitImageMiddleware = (tableName, limit) => {
    return async (req, res, next) => {
        try {
            const [rows] = await db.query(`SELECT * FROM ${tableName}`);
            if (rows.length >= limit) {
                return res.status(400).json({
                    success: false,
                    message: `Maximum Logo Limit Reached! Only ${limit} images allowed.`,
                });
            }
            next();
        } catch (error) {
            console.error("Limit middleware error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    };
};

export { limitImageMiddleware };
