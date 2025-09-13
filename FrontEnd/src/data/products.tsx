// src/data/products.ts

import { Product } from "../types/index";

// Explicitly type the array
const products: Product[] = [
  {
    id: 1,
    title: "Corn",
    price: "PKR 2,500",
    image:
      "https://cdn.prod.website-files.com/5ec959f99359c2ff953a4353/649cd83a6d9e586490d25fec_market-corn.jpg",
    author: "Muhammad Zeeshan Nawaz",
    contactNumber: "0301-1654141",
  },
  {
    id: 2,
    title: "Rice",
    price: "PKR 5,000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7zHT1yn42JQ_mQ0oSP7vXuDwvEAeZj_2-XQ&s",
    author: "Husnain Khalid",
    contactNumber: "0314-4617291",
  },
  {
    id: 3,
    title: "Corn",
    price: "PKR 2,700",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/8/334836385/UJ/RM/IO/23524314/yellow-corn-maize.jpg",
    author: "Okasha Javaid",
    contactNumber: "0325-4586487",
  },
  {
    id: 4,
    title: "Rice",
    price: "PKR 5,400",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGomIrjuZiW0l2Mx1xi0fsux4CyDMK_EJiZ-35ZPnEHVYTq84a9AB7lxKPCrIL-TwbeI&usqp=CAU",
    author: "Muhammad Zeeshan Nawaz",
    contactNumber: "0301-1654141",
  },
  {
    id: 5,
    title: "Wheat",
    price: "PKR 3,000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqCZ8I2DKIrzZtkFEJvNCUoob_AzgTbLKLiw&s",
    author: "Husnain Khalid",
    contactNumber: "0314-4617291",
  },
  {
    id: 6,
    title: "Wheat",
    price: "PKR 3,700",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_n_caGCdMWvbjWs5XyNK4WngkWfZ_RNIbZ3Ngas0BY59DgYvOTziszYSFKW1OafT8cW4&usqp=CAU",
    author: "Okasha Javaid",
    contactNumber: "0325-4586487",
  },
];

export default products;
