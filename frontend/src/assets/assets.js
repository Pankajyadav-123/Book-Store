import img1 from "./gatesby.jpg";
import img2 from "./becominng.png";
import img3 from "./godan.jpg";
import img4 from "./echo.jpg";
import img5 from "./gunaho.jpg";
import img6 from "./rsimarthi.jpg";
import search_icon from "./search_icon.png";
import cart_icon from "./cart_icon.png";
import profile_icon from "./profile_icon.png";
import menu_icon from "./menu_icon.png";
import dropdown_icon from "./dropdown_icon.png";
import logo from "./logo.png";
import star_icon from "./star_icon.png";
import star_dull_icon from "./star_dull_icon.png";
import bin_icon from "./bin_icon.png";
import stripe_logo from "./stripe_logo.png";
import razorpay_logo from "./razorpay_logo.png";
import hero from "./hero.png";


export const assets = {
    search_icon,
    cart_icon,
    profile_icon,
    menu_icon,
    dropdown_icon,
    logo,
    star_icon,
    star_dull_icon,
    bin_icon,
    stripe_logo,
    razorpay_logo,
    hero
}

export const Books = [
    {
        _id: "aaaa",
        title: "The Great Gatsby",
        description: "A story about the choices that go into a life well lived.",
        price: 18.99,
        image: [img1],
        language: "English",
        category: "Novel",
        bestseller: true,
        author: "F. Scott Fitzgerald",
        bestseller: true
    },
    {
        _id: "aaab",
        title: "Becoming",
        description: "A memoir by Michelle Obama chronicling her life from childhood to the White House.",
        price: 24.99,
        image: [img2],
        lanuage: "English",
        category: "Biography",
        bestseller: true,
        author: "Michelle Obama",
        bestseller: true
    },

    {
        _id: "aaac",
        title: "Godan (ग़ोदान)",
        description: "The masterpiece of Munshi Premchand, depicting the struggle of the Indian peasantry.",
        price: 250.00,
        image: [img3],
        language: "Hindi",
        category: "Novel",
        bestseller: true,
        author: "Munshi Premchand",
        bestseller: true
    },
    {
        _id: "aaad",
        title: "The Silent Echo",
        description: "A fast-paced psychological thriller with a shocking twist.",
        price: 1299.00,
        image: [img4],
        language: "English",
        category: "Story",
        bestseller: false,
        author: "J.R. Rain",
        bestseller: true
    },
    {
        _id: "aaae",
        title: "Gunahon Ka Devta (गुनाहों का देवता)",
        description: "Dharmveer Bharti's legendary story of unrequited love and morality.",
        price: 350.00,
        image: [img5],
        language: "Hindi",
        category: "Story",
        bestseller: false,
        author: "Dharmveer Bharti",
        bestseller: true
    },
    {
        _id: "aaaf",
        title: "Rashmirathi (रश्मिरथी)",
        description: "An epic poetic narrative of the life of Karna from the Mahabharata.",
        price: 199.00,
        image: [img6],
        language: "Hindi",
        category: "Poetry",
        bestseller: false,
        author: "Ramdhari Singh Dinkar",
        bestseller: true
    }

]