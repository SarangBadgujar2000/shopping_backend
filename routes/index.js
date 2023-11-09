const express = require("express");
const passport = require("passport");
const {createUser,loginUser, getUsers} = require("../controllers/userController");
const {addBanner,getBanners, deleteBanner, updateBanner} = require("../controllers/bannerController");
const { addProduct, getProducts, updateProduct } = require("../controllers/productController");
const multer  = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname.trim().replace(/\s+/g, ""))
    }
  })
  
  const upload = multer({ storage: storage })
//userController
router.post("/createUser",createUser);
router.post("/loginUser",loginUser);
router.get("/getUsers",passport.authenticate('jwt',{session:false}) ,getUsers);

//baneerController
router.get("/get-banner",getBanners)
router.post("/add-banner",passport.authenticate('jwt', {session: false}),addBanner)
router.delete('/delete-banner/:bannerId', passport.authenticate('jwt', {session: false}),deleteBanner)
router.put('/update-banners/:bannerId', passport.authenticate('jwt', {session: false}),updateBanner)




//productController
router.post('/add-product', passport.authenticate('jwt', {session: false}),addProduct)
router.get('/get-products',getProducts)
router.put('/update-product/:productId', passport.authenticate('jwt', {session: false}),updateProduct)


router.post("/upload",upload.single('banner'),(req,res)=>{
    console.log(req.file);
    return res.status(200).json({
        statusCode: 200,
        message: "File ploaded Successfully",
        data:`${process.env.BASE_URL}/files/${req.file.filename}`
    });
}) 



module.exports = router;
