import usermodel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await usermodel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await usermodel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
    console.log("AddToCart was hit successfully");
  } catch (error) {
    console.log("AddToCart was hit unsuccessfully");
    console.log(error);
    res.json({ success: false, message: "Error in add to cart" });
  }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await usermodel.findById(req.body.userId);
  } catch (error) {}
};

// fetch user cart data
const getCart = async (req, res) => {};

export { addToCart, removeFromCart, getCart };
