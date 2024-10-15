import React from "react";
import { IoMdHome } from "react-icons/io";
import { TbCategoryFilled } from "react-icons/tb";
import { FaProductHunt } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { AiOutlineBorder } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";


export const SidebarData=[
    {
        title:'Home',
        path:'/admin',
        icon:<IoMdHome />,
        cname:'nav-text'
    },
    {
        title:'Category',
        path:'/category',
        icon:<TbCategoryFilled />,
        cname:'nav-text'
    },
    {
        title:'Product',
        path:'/product',
        icon:<FaProductHunt />,
        cname:'nav-text'
    },
    {
        title:'Orders',
        path:'/Ordermanage',
        icon:<AiOutlineBorder />,
        cname:'nav-text'
    }
]