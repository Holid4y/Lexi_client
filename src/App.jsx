import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAccessTokenValidity } from "./common/reducers/authSlice";
import { fetchSettings } from "./common/reducers/userSlice";
import { fetchTrainingInfo } from "./common/reducers/trainingSlice";
import { setTheme } from "./common/reducers/themeSlice";
import Navigation from "./common/components/Navigation";
import Home from "./pages/home/Home";
import BookList from "./pages/books/BookList";
import BookRetrieve from "./pages/book-retrieve/BookRetrieve";
import BookmarkList from "./pages/bookmark-list/BookmarkList";
import Recognize from "./pages/training/recognize/Recognize";
import Reproduce from "./pages/training/reproduce/Reproduce";
import Training from "./pages/training/Training";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Profile from "./pages/profile/ProfileUser";
import LvlSettings from "./pages/profile/lvlSettings";
import WordList from "./pages/word-list-user/WordList";
import Statistic from "./pages/statistic-user/Statistic";
import AutoScroll from "./common/components/AutoScroll";

function App() {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.auth);
    const { theme } = useSelector((state) => state.theme);
    const { dark_theme } = useSelector((state) => state.user);

    function getColorScheme() {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
            return "light";
        } else {
            return "light"; // По умолчанию выбираем светлую тему, если системная настройка не определена
        }
    }

    useEffect(() => {
        dispatch(checkAccessTokenValidity());
        dispatch(fetchTrainingInfo());

        const storedTheme = localStorage.getItem("theme");

        // Проверка хранилища на наличие темы
        if (storedTheme) {
            dispatch(setTheme(storedTheme));
        } else if (isAuth) {
            // Пользователь зарегистрирован
            dispatch(fetchSettings());
            if (dark_theme !== undefined) {
                // Если есть настройки пользователя, то устанавливаем их и сохраняем в локальном хранилище
                dispatch(setTheme(dark_theme ? "dark" : "light"));
                localStorage.setItem("theme", dark_theme ? "dark" : "light");
                return;
            }
        }

        // Если хранилище пустое и пользователь не зарегистрирован, то устанавливаем тему в зависимости от системной настройки
        if (storedTheme == null && isAuth == null) {
            const systemTheme = getColorScheme();
            dispatch(setTheme(systemTheme));
            localStorage.setItem("theme", systemTheme);
        }
    }, [dispatch, isAuth, dark_theme]);

    useEffect(() => {
        document.documentElement.setAttribute("data-bs-theme", theme);
    }, [theme]);

    return (
        <Router>
            <div>
                <AutoScroll />
                <ConditionalNavigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/books" element={<BookList />} />
                    <Route path="/book/:slug/:page" element={<BookRetrieve />} />
                    <Route path="/bookmarks" element={<BookmarkList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/training/recognize" element={<Recognize />} />
                    <Route path="/training/reproduce" element={<Reproduce />} />
                    <Route path="/training" element={<Training />} />
                    <Route path="/word-list" element={<WordList />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/statistic" element={<Statistic />} />
                    <Route path="/lvl-settings" element={<LvlSettings />} />
                    {/* Другие маршруты */}
                </Routes>
            </div>
        </Router>
    );
}

function ConditionalNavigation() {
    const location = useLocation();
    const hideNavigationPaths = ["/login", "/register"]; // пути, на которых не нужно показывать навигацию

    return hideNavigationPaths.includes(location.pathname) ? null : <Navigation />;
}

export default App;
