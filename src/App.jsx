import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkAccessTokenValidity } from "./common/reducers/authSlice";
import { fetchSettings } from "./common/reducers/userSlice";
import { NotificationProvider } from "./common/components/Notification/NotificationContext";

import Navigation from "./common/components/Navigation/Navigation";
import Home from "./pages/home/Home";

import BookList from "./pages/books/BookList";
import BookRetrieve from "./pages/book-retrieve/BookRetrieve";
import BookmarkList from "./pages/bookmark-list/BookmarkList";
import MyBookList from "./pages/my-books/MyBookList"

import Recognize from "./pages/training/recognize/Recognize";
import Reproduce from "./pages/training/reproduce/Reproduce";
import Training from "./pages/training/Training";

import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import ChangePass from "./pages/auth/changepass/ChangePass";
import ForgotPass from "./pages/auth/forgotpass/ForgotPass";
import SendResetPassword from "./pages/auth/forgotpass/SendResetPassword";
import ChangeEmail from "./pages/auth/change-email/ChangeEmail";
import ActivationEmail from "./pages/auth/activation-email/ActivationEmail";

import Profile from "./pages/profile/ProfileUser";
import LevelSettings from "./pages/levels-settings/levelSettings"
import WordList from "./pages/word-list-user/WordList";
import Statistic from "./pages/statistic-user/Statistic";
import LandingMain from "./pages/landing/LandingMain";


function App() {
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.user);

    function getOSColorScheme() {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) { return "dark"; } 
        else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) { return "light"; } 
        else { return "dark"; }
    }
    useEffect(() => {
        dispatch(checkAccessTokenValidity());
        dispatch(fetchSettings());
    }, []);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        document.documentElement.setAttribute("data-bs-theme", storedTheme);

        if (theme !== null) {
            // Если есть настройки пользователя, то устанавливаем их и сохраняем в локальном хранилище
            localStorage.setItem("theme", theme);
            console.log(theme, "theme !== null")
            document.documentElement.setAttribute("data-bs-theme", theme);
            return;
        }
        // Если хранилище пустое и у пользователя нет темы, то устанавливаем тему в зависимости от системной настройки
        if (storedTheme == null & theme == null) {
            
            const systemTheme = getOSColorScheme();
            localStorage.setItem("theme", systemTheme);
            console.log(systemTheme, "storedTheme == null & theme == null")
            document.documentElement.setAttribute("data-bs-theme", systemTheme);
        }
    }, [dispatch, theme]);

    // Убирает стандартное поведение Tab на сайте
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Tab") {
                event.preventDefault();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <NotificationProvider>
            <Router>
                <MainComponent dispatch={dispatch} theme={theme} />
            </Router>
        </NotificationProvider>
    );
}

function MainComponent({ dispatch, theme }) {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("access");
        const currentPath = location.pathname;

        const publicPaths = ["/login", "/register", "/landing", "/forgot-password", "/send-reset-password"];
        
        if (!publicPaths.includes(currentPath) && !token) {
            navigate('/login');
        } else if (!publicPaths.includes(currentPath)) {
            dispatch(checkAccessTokenValidity());
            dispatch(fetchSettings());
        }
    }, [dispatch, navigate, location]);

    useEffect(() => {
        // ... код для установки темы
    }, [dispatch, theme]);

    return (
        <div>
            <ConditionalNavigation location={location} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/change-pass" element={<ChangePass />} />
                <Route path="/forgot-password/:uid/:token" element={<ForgotPass />} />
                <Route path="/send-reset-password" element={<SendResetPassword />} />
                <Route path="/change-email" element={<ChangeEmail />} />
                <Route path="/activation/:uid/:token" element={<ActivationEmail />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/book/:slug/:page" element={<BookRetrieve />} />
                <Route path="/bookmarks" element={<BookmarkList />} />
                <Route path="/my-books" element={<MyBookList />} />
                <Route path="/training/recognize" element={<Recognize />} />
                <Route path="/training/reproduce" element={<Reproduce />} />
                <Route path="/training" element={<Training />} />
                <Route path="/word-list" element={<WordList />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/statistic" element={<Statistic />} />
                <Route path="/level-settings" element={<LevelSettings />} />
                <Route path="/landing" element={<LandingMain />} />
                {/* Другие маршруты */}
            </Routes>
        </div>
    );
}

function ConditionalNavigation({ location }) {
    const hideNavigationPaths = ["/login", "/register", "/landing", "/forgot-password", "/send-reset-password"];
    return hideNavigationPaths.includes(location.pathname) ? null : <Navigation />;
}

export default App;