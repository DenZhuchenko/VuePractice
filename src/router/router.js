import Main from "@/pages/Main";
import {createRouter, createWebHistory} from "vue-router";
import About from "@/pages/About";
import PostPage from "@/pages/PostPage";
import PostIdPage from "@/components/PostIdPage";

const routes  = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/post',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/post/:id',
        component: PostIdPage
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router

