const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../schema/user");

//auth

exports.auth = async (req, res, next) => {
  try {
    

    // Extracting JWT from the Authorization header
    const tokenWithBearer = req.header("Authorization");

    if (!tokenWithBearer) {
      return res.status(401).json({ success: false, message: "Token Missing" });
    }

    // Remove the "Bearer " prefix if present
    const token = tokenWithBearer.startsWith("Bearer ")
      ? tokenWithBearer.slice(7).trim()
      : null;

    if (!token) {
      return res.status(401).json({ success: false, message: "Invalid Token Format" });
    }

    try {
      // Verifying the JWT using the secret key stored in environment variables
      console.log("JWT_SECRET: ", process.env.JWT_SECRET);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded Token: ", decoded);

      // Storing the decoded JWT payload in the request object for further use
      req.user = decoded;

      // Proceed to the next middleware or request handler
      next();
    } catch (error) {
      console.error("Error verifying token: ", error);
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }
  } catch (error) {
    console.error("Error in auth middleware: ", error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Validating the Token",
    });
  }
};


//isStudent
exports.isStudent = async (req, res, next) => {
 try{

    console.log("Reached isStudent");
        if(req.user.accountType !== "Student") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Students only',
            });
        }
        next();
 }
 catch(error) {
    return res.status(500).json({
        success:false,
        message:'User role cannot be verified, please try again'
    })
 }
}


//isInstructor
exports.isInstructor = async (req, res, next) => {
    try{
           if(req.user.accountType !== "Instructor") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Instructor only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }


//isAdmin
exports.isAdmin = async (req, res, next) => {
    try{
           if(req.user.accountType !== "Admin") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Admin only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }