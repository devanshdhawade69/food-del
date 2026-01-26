import usermodel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await usermodel.findById(req.body.userId);
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
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await usermodel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed From Cart" });
    console.log("removeFromCart was hit successfully");
  } catch (error) {
    console.log("removeFromCart was hit unsuccessfully");
    console.log(error);
    res.json({ success: false, message: "Error in remove from cart" });
  }
};

// fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await usermodel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
    console.log("getCart was hit successfully");
  } catch (error) {
    console.log("getCart was hit unsuccessfully");
    console.log(error);
    res.json({ success: false, message: "Error in fetching cart data" });
  }
};

export { addToCart, removeFromCart, getCart };
