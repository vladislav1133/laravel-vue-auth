import Home from "../components/Home"

export default [
    {
        path: '/',
        component: Home,
        'name': 'home',
        meta: {
            guest: false,
            needsAuth: false
        }
    }
]