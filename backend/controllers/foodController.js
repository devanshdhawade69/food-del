import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  // console.log(req.body);

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
    console.log("addfood hit was succesful");
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in adding food" });
    console.log("addfood hit was unsuccesful");
  }
};

// all fodd list
const listfood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
    console.log("listfood hit was succesful");
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in listing food" });
    console.log("listfood hit was unsuccesful");
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
    console.log("removeFoodItem hit was succesful");
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in removing food" });
    console.log("removeFoodItem hit was unsuccesful");
  }
};

export { addFood, listfood, removeFood };
