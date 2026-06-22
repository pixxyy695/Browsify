const express = require("express");
const Product = require("../models/product");

const router = express.Router();

// GET /api/products?category=Electronics&cursor=<createdAt_ISO>&cursorId=<_id>
router.get("/", async (req, res) => {
  try {
    const { category, cursor, cursorId } = req.query;
    const PAGE_SIZE = 20;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (cursor && cursorId) {
      const cursorDate = new Date(cursor);
      filter.$or = [
        { createdAt: { $lt: cursorDate } },
        { createdAt: cursorDate, _id: { $lt: cursorId } },
      ];
    }

    const products = await Product.find(filter)
      .sort({ createdAt: -1, _id: -1 })
      .limit(PAGE_SIZE)
      .lean();

    const lastProduct = products[products.length - 1];

    res.json({
      products,
      nextCursor:
        products.length === PAGE_SIZE && lastProduct
          ? { createdAt: lastProduct.createdAt, id: lastProduct._id }
          : null,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
/*{const express = require("express");
const mongoose=require("mongoose");
const product=require("../models/product");
const router=express.Router();
router.get("/",async(req,res)=>{
    const {category,cursor}= req.query;
    const filter=category?{category}:{};
    if(cursor){
        filter._id={$lt:new mongoose.Types.ObjectId(cursor)};
    }
    try{
        
        const products=await product.find(filter).sort({_id:-1}).limit(20);
        console.log(cursor);
        res.json({
            products,
            nextCursor:products.length>0?products[products.length-1]._id:null,
        });
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
});
module.exports=router}*/;