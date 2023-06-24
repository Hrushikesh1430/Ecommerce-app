import { v4 as uuid } from "uuid";

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  {
    _id: uuid(),
    brand: "Allen Solly",
    name: "Men's Regular Fit Jacket",
    price: "999",
    categoryName: "Men",
    image: "Allen_Solly_Jacket.jpg",
    size: "M",
    rating: "4.5",
  },
  {
    _id: uuid(),
    brand: "HangoutHub",
    name: "Round Neck F.R.I.E.N.D.S 100% Cotton T-Shirt",
    price: "1499",
    categoryName: "Men",
    image: "",
    size: "M",
    rating: "4.8",
  },
  {
    _id: uuid(),
    brand: "LEOTUDE",
    name: "Cotton Blend Half Sleeve Printed Oversized T-Shirts for Men",
    price: "899",
    categoryName: "Men",
    image: "",
    size: "L",
    rating: "3.6",
  },
  {
    _id: uuid(),
    brand: "Peter England",
    name: "Men Shirt",
    price: "699",
    categoryName: "Men",
    image: "",
    size: "L",
    rating: "3.8",
  },
  {
    _id: uuid(),
    brand: "PUMA",
    name: "Men T-shirt Camo Box",
    price: "1999",
    categoryName: "Men",
    image: "",
    size: "S",
    rating: "2.8",
  },
  {
    _id: uuid(),
    brand: "Souled Store",
    name: "Hogwarts Tshirt",
    price: "1399",
    categoryName: "Men",
    image: "",
    size: "S",
    rating: "5",
  },
  {
    _id: uuid(),
    brand: "Souled Store",
    name: "Men Official Harry Potter Hogwarts Multicolored Printed Oversized T-Shirt",
    price: "1599",
    categoryName: "Men",
    image: "",
    size: "XL",
    rating: "5",
  },
  {
    _id: uuid(),
    brand: "SWADESI STUFF",
    name: "Regular Fit Striped Round Neck Half Sleeve T-Shirt for Men",
    price: "999",
    categoryName: "Men",
    image: "",
    size: "XL",
    rating: "1.5",
  },
  {
    _id: uuid(),
    brand: "Tommy Hilfiger",
    name: "Men Shirt",
    price: "1999",
    categoryName: "Men",
    image: "",
    size: "S",
    rating: "1.8",
  },
  {
    _id: uuid(),
    brand: "TOPLOTT",
    name: "Shirt for Mens with Crew Neck & Regular Sleeves",
    price: "2499",
    categoryName: "Men",
    image: "",
    size: "S",
    rating: "3.4",
  },
  // Women category
  {
    _id: uuid(),
    brand: "Ada Hand",
    name: "Embroidered Lucknow Chikankari Straight Cotton Short Kurti Tunic Top for Women ",
    price: "999",
    categoryName: "Women",
    image: "",
    size: "M",
    rating: "4.5",
  },
  {
    _id: uuid(),
    brand: "Amarya",
    name: "Women's Rayon Embroidery Anarkali Kurta with Pant and Dupatta Set",
    price: "1599",
    categoryName: "Women",
    image: "",
    size: "M",
    rating: "4.2",
  },
  {
    _id: uuid(),
    brand: "FABRIC FITOOR",
    name: "Women Pure Organic Cotton Bell Sleeves Round Tie Ups Neck Regular Floral Print Peplum Top for Girls",
    price: "1299",
    categoryName: "Women",
    image: "",
    size: "L",
    rating: "3.6",
  },
  {
    _id: uuid(),
    brand: "J TURRITOPSIS",
    name: "Women's Rayon Printed Oversized Shirt Top",
    price: "899",
    categoryName: "Women",
    image: "",
    size: "L",
    rating: "3.2",
  },
  {
    _id: uuid(),
    brand: "KBZ",
    name: "Womens Rayon Printed Flared Top",
    price: "1799",
    categoryName: "Women",
    image: "",
    size: "XL",
    rating: "2.6",
  },
  {
    _id: uuid(),
    brand: "LEOTUDE",
    name: "Women's Cottonblend Oversized Half Sleeve Printed T-Shirt",
    price: "1499",
    categoryName: "Women",
    image: "",
    size: "XL",
    rating: "2.2",
  },
  {
    _id: uuid(),
    brand: "PURVAJA",
    name: "Women's Midi Bodycon Dress",
    price: "1999",
    categoryName: "Women",
    image: "",
    size: "M",
    rating: "1.2",
  },
  {
    _id: uuid(),
    brand: "RodZen",
    name: "Oversized Tee for Women",
    price: "1599",
    categoryName: "Women",
    image: "",
    size: "M",
    rating: "1.8",
  },
  {
    _id: uuid(),
    brand: "Vaamsi",
    name: "Women's Cotton Blend Floral Printed Straight Kurta with Dupatta",
    price: "1299",
    categoryName: "Women",
    image: "",
    size: "L",
    rating: "4.8",
  },
  {
    _id: uuid(),
    brand: "VUBA",
    name: "Women's Pure Cotton Floral Printed Tunic Top",
    price: "1899",
    categoryName: "Women",
    image: "",
    size: "L",
    rating: "4.4",
  },

  // kids category

  {
    _id: uuid(),
    brand: "Bon Organik ",
    name: "Boys T-Shirt",
    price: "1799",
    categoryName: "Kids",
    image: "",
    size: "XL",
    rating: "1.4",
  },
  {
    _id: uuid(),
    brand: "Cherry Crumble California Rover Polo",
    name: "Boys T-Shirt",
    price: "999",
    categoryName: "Kids",
    image: "",
    size: "XL",
    rating: "1.2",
  },
  {
    _id: uuid(),
    brand: "Chombooka",
    name: "Boys & Girls Graphics Print Full Sleeve Round Neck Kids Cotton T Shirt",
    price: "1299",
    categoryName: "Kids",
    image: "",
    size: "L",
    rating: "2.6",
  },
  {
    _id: uuid(),
    brand: "Fashion Dream",
    name: "Girl's Pink Poly Rayon Knee Length Dresses",
    price: "1999",
    categoryName: "Kids",
    image: "",
    size: "L",
    rating: "2.6",
  },
  {
    _id: uuid(),
    brand: "Fashion Dream",
    name: "Girls Crepe Silk Maxi Length Digital Printed Dress",
    price: "1599",
    categoryName: "Kids",
    image: "",
    size: "S",
    rating: "3.6",
  },
  {
    _id: uuid(),
    brand: "GLORYBOYZ",
    name: "Regular Fit Doodles Theme Printed Designer Classic Casual Trendy for Boys & Kids",
    price: "899",
    categoryName: "Kids",
    image: "",
    size: "S",
    rating: "3.8",
  },
  {
    _id: uuid(),
    brand: "Luke and Lilly Boy's",
    name: "Cut and Sew Half Sleeve Multicolor T-Shirt_Pack of 2",
    price: "1699",
    categoryName: "Kids",
    image: "",
    size: "M",
    rating: "5",
  },
  {
    _id: uuid(),
    brand: "Naughty Ninos",
    name: "Girls Pinafore Dress Peachy Pink",
    price: "1299",
    categoryName: "Kids",
    image: "",
    rating: "1.2",
  },
  {
    _id: uuid(),
    brand: "Naughty Ninos",
    name: "Girls Red Checked Shirt Dress",
    price: "1499",
    categoryName: "Kids",
    image: "",
    size: "L",
    rating: "1.7",
  },
  {
    _id: uuid(),
    brand: "ANIMESTORE",
    name: "Round Neck Half Sleeve Anime Characters Casual Printed Tshirts for Kids, Boys and Girls",
    price: "1299",
    categoryName: "Kids",
    image: "",
    size: "L",
    rating: "4.7",
  },
  {
    _id: uuid(),
    brand: "U.S. POLO ASSN",
    name: "Boys T-Shirt",
    price: "1599",
    categoryName: "Kids",
    image: "",
    size: "XL",
    rating: "4.2",
  },
];
