import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const { token } = res.cookies;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated!",
        success: false,
      });
    }

    //Token Verify
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).json({
          message: "Auth Failed!",
          success: false,
        });
      } else {
        req.userId = decode.id;
        next();
      }
    });
  } catch (err) {
    return res.status(401).json({
      message: "Auth Failed!",
      success: false,
    });
  }
};
