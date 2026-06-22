const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true, // auto-manages createdAt and updatedAt
  }
);

// Indexes for fast cursor-based pagination
// These are also created in seed.js, but defining here ensuresī
// they exist even if someone skips seeding.
productSchema.index({ createdAt: -1 });
productSchema.index({ category: 1, createdAt: -1 });

module.exports = mongoose.model("Product", productSchema);
/*{const mongoose = require("mongoose");
const productSchema=new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    category: {
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
},
{
    timestamps:true,
}
);
module.exports=mongoose.model("Product",productSchema);}*/