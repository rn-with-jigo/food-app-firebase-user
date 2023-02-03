import uuid from "react-native-uuid";
import { AppAssets } from "../assets/appAssets";

export const commanStrings = {
    order_cancled: "Cancled",
    order_placed: "Placed",
    order_accepted: "Accepted",
    order_Completed: "Completed",
    order_prepared: "Prepared",
}

export const options = [
    {
        id: "op#001",
        name: "with name, price | SNP",
        slug: "SNP",
    },
    {
        id: "op#002",
        name: "with name, image, price | SNIP",
        slug: "SNIP",
    },
]

export const options1 = [
    {
        id: "op#001",
        name: "Ch. with name, price | NP",
        slug: "SNP",
    },
    {
        id: "op#002",
        name: "Ch. with name, image, price | SNIP",
        slug: "SNIP",
    }
]

export const optionsList = [
    {
        id: "#001",
        imgUrl: "https://images.unsplash.com/photo-1598511756348-640384c52ada?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
        id: "#002",
        imgUrl: "https://images.unsplash.com/photo-1598515213345-d710d121c709?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
        id: "#003",
        imgUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
        id: "#004",
        imgUrl: "https://images.unsplash.com/photo-1598511756348-640384c52ada?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
]

export const optionsListProducts = [
    {
        id: "#001",
        imgUrl: "https://d1rgpf387mknul.cloudfront.net/products/PLP/web/2x_web_20220314070554598878_482x264jpg",
        name: "Crispy Veg Double Patty"
    },
    {
        id: "#002",
        imgUrl: "https://d1rgpf387mknul.cloudfront.net/products/PLP/web/2x_web_20221027205258153832_482x264jpg",
        name:"BK Classic Veg"
    },
    {
        id: "#003",
        imgUrl: "https://d1rgpf387mknul.cloudfront.net/products/PLP/web/2x_web_20220314071027029352_482x264jpg",
        name:"Classic Veg Double Patty Burger"
    },
    {
        id: "#004",
        imgUrl: "https://www.dominos.co.in/files/items/160790_Burger_Pizza_427X298_Pixel.jpg",
        name: "BURGER PIZZA- PREMIUM VEG"
    },
]

/**
 * 
 * @param {number} limit 
 * @description limit paramenter for the take limt of string.
 * @returns 
 */
export const getRandomString = (limit = 8) => {
    return uuid.v4().substring(0, limit);
}