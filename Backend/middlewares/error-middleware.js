const errorMiddleware =(err, req, res, next) => {
 const status =err.status || 500;
 const message =err.message || "BACKEND ERROR";
 const extraDetaiks =err.extraDetaiks || "Error from Backend";

 return res.status(status).json({message,extraDetaiks})
};
module.exports = errorMiddleware;