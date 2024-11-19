import { AppRoutes } from './src/constants/constants'
import LoginPage from './src/pages/LoginPage/LoginPage'
import MainPage from './src/pages/MainPage/MainPage'

export const routesConfig = [
    {
        url: AppRoutes.HOME,
        component: LoginPage,
        isPrivate: false,
    },
    {
        url: AppRoutes.MY_CALENDAR,
        component: MainPage,
        isPrivate: true,
    },
];