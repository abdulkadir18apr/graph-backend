const jwt=require("jsonwebtoken");
const JWT_SECRET=process.env.JWT_SECRET

const authVerify=async(req,res,next)=>{
    const token=req.headers.authorization;
    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        req.user={userId:decoded.userId};
        return next();
    }
    catch(error){
 
        return res.status(401).json({ success:false,errorMessage: "Unauthorised access, please add the token" })
    }

}

module.exports={authVerify}