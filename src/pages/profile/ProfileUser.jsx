import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Avatar from 'avataaars';

import { fetchSettings, fetchPutSettings, throwUser } from "../../common/reducers/userSlice";
import { setIsAuth } from "../../common/reducers/authSlice";
import { setTheme } from "../../common/reducers/themeSlice";
import { renderResponse } from "../../../public/urls";

import { isActivatedEmail } from "./utils.js/utils";

import Loading from "../../common/components/Treatment/Loading";

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { username, email, activated_email, number_of_false_set, levels, count_word_in_round, time_to_view_result, loading, error, putLoading } = useSelector((state) => state.user);
    const currentTheme = useSelector((state) => state.theme.theme); // Получаем текущую тему из Redux

    const [themeState, setThemeState] = useState(currentTheme);
    const [falseSetLevel, setFalseSetLevel] = useState();
    const [countWordInRoundState, setCountWordInRoundState] = useState();
    const [timeToViewResultState, setTimeToViewResultState] = useState();

    // State для хранения настроек аватара
    const [avatarOptions, setAvatarOptions] = useState({
        topType: 'ShortHairShortWaved',
        accessoriesType: 'Prescription02',
        hairColor: 'BrownDark',
        facialHairType: 'Blank',
        clotheType: 'Hoodie',
        clotheColor: 'PastelBlue',
        eyeType: 'Happy',
        eyebrowType: 'Default',
        mouthType: 'Smile',
        skinColor: 'Light',
        avatarStyle: 'Transparent',
    });

    useEffect(() => {
        if (!username) {
            dispatch(fetchSettings());
        }
    }, [dispatch, username]);

    // заполняем state когда он появится в redux
    useEffect(() => {
        if (username) {
            setFalseSetLevel(number_of_false_set);
            setCountWordInRoundState(count_word_in_round)
            setTimeToViewResultState(time_to_view_result)
        }
    }, [username, number_of_false_set, count_word_in_round, time_to_view_result]);

    useEffect(() => {
        if (currentTheme) {
            setThemeState(currentTheme); // Синхронизация локального состояния с Redux
        }
    }, [currentTheme]);

    const handleThemeChange = (event) => {
        const value = event.target.value;
        setThemeState(value);
        dispatch(setTheme(value));
        localStorage.setItem("theme", value);
    };

    const handleIncrementLevel = () => {
        if (falseSetLevel < 5) {
            setFalseSetLevel(falseSetLevel + 1);
        }
    };

    const handleDecrementLevel = () => {
        if (falseSetLevel > 2) {
            setFalseSetLevel(falseSetLevel - 1);
        }
    };

    const handleIncrementCountWordInRound = () => {
        if (countWordInRoundState < 25) {
            setCountWordInRoundState(countWordInRoundState + 1);
        }
    };

    const handleDecrementCountWordInRound = () => {
        if (countWordInRoundState > 5) {
            setCountWordInRoundState(countWordInRoundState - 1);
        }
    };

    const handleIncrementTimeToViewResultState = () => {
        if (timeToViewResultState < 5000) {
            setTimeToViewResultState(timeToViewResultState + 100);
        }
    };

    const handleDecrementTimeToViewResultState = () => {
        if (timeToViewResultState > 0) {
            setTimeToViewResultState(timeToViewResultState - 100);
        }
    };

    function handleSave() {
        const data = {
            dark_theme: themeState,
            number_of_false_set: falseSetLevel,
            count_word_in_round: countWordInRoundState,
            time_to_view_result: timeToViewResultState
        };
        console.log(data, "input data");
        dispatch(fetchPutSettings(data));
    }

    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        dispatch(setIsAuth(false))
        dispatch(throwUser())
        navigate("/login");
    };

    const LoadingView = <Loading />;

    const hasChanges = (
        falseSetLevel !== number_of_false_set ||
        countWordInRoundState !== count_word_in_round ||
        timeToViewResultState !== time_to_view_result
    );

    const Header = (
        <div className="container sticky-top mb-4 pt-2">
            <nav className="navbar dark-nav">
                <div className="container-fluid px-1">
                    <span className="navbar-brand">Профиль</span>
                    {putLoading ? (
                        <button className="btn mx-0 text-success">
                            <span className="visually-hidden">Загрузка...</span>
                        </button>
                    ) : hasChanges ? (
                        <button className="btn mx-0 text-success" onClick={handleSave}>
                            Сохранить
                        </button>
                    ) : null}
                </div>
            </nav>
        </div>
    );

    const UserName = <h1 className="text-uppercase text-break mb-2">{renderResponse(username, "...", loading, error)}</h1>

    const UserEmail = <span className="fs-5 text-secondary text-break">{renderResponse(email, "", loading, error)}</span>

    const FormEmail = (
        <div>
            {/* <label htmlFor="email" className="form-label">
                Email
            </label> */}
            <input type="email" className="form-control py-2-5" id="email" defaultValue={renderResponse(email, "", loading, error)} />
            {isActivatedEmail(activated_email) ? (
                ""
            ) : (
                <div>
                    <span className="text-danger mb-4 ps-2">Почта не подтверждена</span>
                    <span className="change pe-2">
                        <a className="btn btn-primary" href="/html/change_pass.html">
                            Подтвердить
                        </a>
                    </span>
                </div>
            )}
        </div>
    );

    const FormTheme = (
        <div className="form-control mb-3 py-2 d-flex justify-content-between align-items-center">
            <select className="form-select" value={themeState} onChange={handleThemeChange}>
                <option value="light">Светлая</option>
                <option value="dark">Темная</option>
                <option value="green">Зеленая</option>
                <option value="red">Красная</option>
            </select>
        </div>
    );

    const LinkLvl = (
        <Link to="/lvl-settings" className="form-control mb-3 py-2-5 d-flex justify-content-between">
            <span className="text-start">Настроить уровни словаря</span>
            <span className="text-end">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                </svg>
            </span>
        </Link>
    );

    const FormFalset = (
        <div>
            <span className="ps-2">{falseSetLevel === number_of_false_set ? "Кол-во ложных вариантов" : "Кол-во ложных вариантов (не сохранено)"}</span>
            <div className="input-group mb-2">
                <input type="number" className="form-control py-2-5" defaultValue={falseSetLevel} />
                <button className="btn btn-primary-light" onClick={handleIncrementLevel} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                </button>
                <button className="btn btn-primary-light" onClick={handleDecrementLevel} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                    </svg>
                </button>
            </div>
        </div>
    );

    const FormCountWordInRound = (
        <div>
            <span className="ps-2">{countWordInRoundState === count_word_in_round ? "Кол-во слов в раунде" : "Кол-во слов в раунде (не сохранено)"}</span>
            <div className="input-group mb-2">
                <input type="number" className="form-control py-2-5" defaultValue={countWordInRoundState} />
                <button className="btn btn-primary-light" onClick={handleIncrementCountWordInRound} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                </button>
                <button className="btn btn-primary-light" onClick={handleDecrementCountWordInRound} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                    </svg>
                </button>
            </div>
        </div>
    );
    const FormTimeToViewResult = (
        <div>
            <span className="ps-2">{timeToViewResultState === time_to_view_result ? "Время отображения результата ответа" : "Время отображения результата ответа (не сохранено)"}</span>
            <div className="input-group mb-2">
                <input type="number" className="form-control py-2-5" defaultValue={timeToViewResultState} />
                <button className="btn btn-primary-light" onClick={handleIncrementTimeToViewResultState} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                </button>
                <button className="btn btn-primary-light" onClick={handleDecrementTimeToViewResultState} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                    </svg>
                </button>
            </div>
        </div>
    );

    // Рендер аватара
    const renderAvatar = () => {
        return (
            <Avatar className="avatar"
                {...avatarOptions}
            />
        );
    };

    // Хэндлеры для изменения аватара
    const handleAvatarChange = (attribute, value) => {
        setAvatarOptions(prevOptions => ({
            ...prevOptions,
            [attribute]: value
        }));
    };

    const OptionsAvatar = 
    <div className="avatar-options">
        <div>
            <label className="form-label">Тип волос:</label>
            <select className="form-select" onChange={(e) => handleAvatarChange('topType', e.target.value)}>
                <option value="NoHair">No Hair</option>
                <option value="Eyepatch">Eyepatch</option>
                <option value="Hat">Hat</option>
                <option value="Hijab">Hijab</option>
                <option value="Turban">Turban</option>
                <option value="WinterHat1">Winter Hat 1</option>
                <option value="WinterHat2">Winter Hat 2</option>
                <option value="WinterHat3">Winter Hat 3</option>
                <option value="WinterHat4">Winter Hat 4</option>
                <option value="LongHairBigHair">Long Hair Big</option>
                <option value="LongHairBob">Long Hair Bob</option>
                <option value="LongHairBun">Long Hair Bun</option>
                <option value="LongHairCurly">Long Hair Curly</option>
                <option value="LongHairCurvy">Long Hair Curvy</option>
                <option value="LongHairDreads">Long Hair Dreads</option>
                <option value="LongHairFrida">Long Hair Frida</option>
                <option value="LongHairFro">Long Hair Fro</option>
                <option value="LongHairFroBand">Long Hair Fro Band</option>
                <option value="LongHairMiaWallace">Long Hair Mia Wallace</option>
                <option value="LongHairNotTooLong">Long Hair Not Too Long</option>
                <option value="LongHairShavedSides">Long Hair Shaved Sides</option>
                <option value="LongHairStraight">Long Hair Straight</option>
                <option value="LongHairStraight2">Long Hair Straight 2</option>
                <option value="LongHairStraightStrand">Long Hair Straight Strand</option>
                <option value="ShortHairDreads01">Short Hair Dreads 01</option>
                <option value="ShortHairDreads02">Short Hair Dreads 02</option>
                <option value="ShortHairFrizzle">Short Hair Frizzle</option>
                <option value="ShortHairShaggyMullet">Short Hair Shaggy Mullet</option>
                <option value="ShortHairShortCurly">Short Hair Short Curly</option>
                <option value="ShortHairShortFlat">Short Hair Short Flat</option>
                <option value="ShortHairShortRound">Short Hair Short Round</option>
                <option value="ShortHairShortWaved">Short Hair Short Waved</option>
                <option value="ShortHairSides">Short Hair Sides</option>
                <option value="ShortHairTheCaesar">Short Hair The Caesar</option>
                <option value="ShortHairTheCaesarSidePart">Short Hair The Caesar Side Part</option>
            </select>
        </div>

        <div>
            <label className="form-label">Цвет волос:</label>
            <select className="form-select" onChange={(e) => handleAvatarChange('hairColor', e.target.value)}>
                <option value="Auburn">Auburn</option>
                <option value="Black">Black</option>
                <option value="Blonde">Blonde</option>
                <option value="BlondeGolden">Blonde Golden</option>
                <option value="Brown">Brown</option>
                <option value="BrownDark">Brown Dark</option>
                <option value="PastelPink">Pastel Pink</option>
                <option value="Platinum">Platinum</option>
                <option value="Red">Red</option>
                <option value="SilverGray">Silver Gray</option>
            </select>
        </div>

        <div>
            <label className="form-label">Тип глаз:</label>
            <select className="form-select" onChange={(e) => handleAvatarChange('eyeType', e.target.value)}>
                <option value="Default">По умолчанию</option>
                <option value="Close">Закрытые</option>
                <option value="Cry">Плачит</option>
                <option value="Dizzy">Головокружение</option>
                <option value="EyeRoll">Закатывание глаз</option>
                <option value="Happy">Счастливые</option>
                <option value="Hearts">Сердце</option>
                <option value="Side">Смотрит в сторону</option>
                <option value="Squint">Прищурился</option>
                <option value="Surprised">Удивление</option>
                <option value="Wink">Подмигивание</option>
                <option value="WinkWacky">Подмигивание дурацкое</option>
            </select>
        </div>

        <div>
            <label className="form-label">Тип рта:</label>
            <select className="form-select" onChange={(e) => handleAvatarChange('mouthType', e.target.value)}>
                <option value="Default">По умолчанию</option>
                <option value="Concerned">Обеспокоенный</option>
                <option value="Disbelief">Сомнение</option>
                <option value="Eating">Принимает пищу</option>
                <option value="Grimace">Гримаса</option>
                <option value="Sad">Грустный</option>
                <option value="ScreamOpen">Кричит</option>
                <option value="Serious">Серьезный</option>
                <option value="Smile">Улыбается 1</option>
                <option value="Twinkle">Улыбается 2</option>
                <option value="Tongue">Показывает язык</option>
                <option value="Vomit">Рвота</option>
            </select>
        </div>

        <div>
            <label className="form-label">Тип одежды:</label>
            <select className="form-select" onChange={(e) => handleAvatarChange('clotheType', e.target.value)}>
                <option value="BlazerShirt">Blazer Свитер</option>
                <option value="BlazerSweater">Blazer Рубашка</option>
                <option value="CollarSweater">Рубашка</option>
                <option value="Hoodie">Толстовка с капюшоном</option>
                <option value="ShirtCrewNeck">Рубашка с круглым вырезом</option>
                <option value="ShirtScoopNeck">Рубашка с овальным вырезом</option>
                <option value="ShirtVNeck">Рубашка с V-образным вырезом</option>
            </select>
        </div>

        <div>
            <label className="form-label">Цвет одежды:</label>
            <select className="form-select" onChange={(e) => handleAvatarChange('clotheColor', e.target.value)}>
                <option value="Black">Черный</option>
                <option value="Blue01">Синий 1</option>
                <option value="Blue02">Синий 2</option>
                <option value="Gray01">Серый 1</option>
                <option value="Gray02">Серый 2</option>
                <option value="PastelBlue">Пастельный синий</option>
                <option value="PastelGreen">Пастельный зеленый</option>
                <option value="PastelOrange">Пастельный оранжевый</option>
                <option value="PastelRed">Пастельный красный</option>
                <option value="PastelYellow">Пастельный желтый</option>
                <option value="Pink">Розовый</option>
                <option value="Red">Красный</option>
                <option value="White">Белый</option>
            </select>
        </div>
    </div>

    return (
        <div className="align-items-center">
            {Header}
            {loading ? (
                LoadingView
            ) : (
                <div className="container pb-5">
                    <div className="row g-4 mb-4 align-items-stretch">
                        <div className="col-4 col-sm-2 d-flex align-items-center position-relative avatar-block">
                            {renderAvatar()}
                            <button type="button" className="position-absolute top-0 translate-middle badge rounded-pill bg-primary hover-opacity btn" data-bs-toggle="modal" data-bs-target="#avatarModal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="col-8 col-sm-10">
                            {UserName}
                            {UserEmail}
                        </div>
                        {/* {OptionsAvatar} */}
                    </div>

                    {/* <div className="row mb-4">
                        <div className="col-6">
                            <div className="card">
                                <h4 className="game-text text-center py-2">Задания</h4>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="card">
                                <h4 className="game-text text-center py-2">Мои достижения</h4>
                            </div>
                        </div>
                    </div> */}
                    
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item w-50 text-center" role="presentation">
                            <button className="nav-link w-100 active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Настройки</button>
                        </li>
                        <li className="nav-item w-50 text-center" role="presentation">
                            <button className="nav-link w-100" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
                                Безопасность
                                {isActivatedEmail(activated_email) ? null : <small className="ms-2 badge bg-warning text-dark">!</small>}
                            </button>
                            
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active my-4" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                            {FormTheme}
                            {LinkLvl}
                            {FormFalset}
                            {FormCountWordInRound}
                            {FormTimeToViewResult}
                        </div>
                        <div className="tab-pane fade my-4" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">

                            {/* Проверка почты */}
                            {isActivatedEmail(activated_email) ? 
                            ""  :
                            (<div className="d-flex justify-content-between mb-3">
                                <p className="pt-2">
                                    <small className="me-2 badge bg-warning text-dark">!</small>
                                    <span>Ваша почта не подтверждена</span>
                                </p>
                                <button className="btn btn-primary ms-2">Отправит письмо</button>
                            </div>)  
                        }
                            
                            <Link to="#" className="form-control mb-3 py-2-5 d-flex justify-content-between">
                                <span className="text-start">Изменить пароль</span>
                                <span className="text-end">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                                    </svg>
                                </span>
                            </Link>
                            <Link to="#" className="form-control mb-3 py-2-5 d-flex justify-content-between">
                                <span className="text-start">Изменить почту</span>
                                <span className="text-end">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                                    </svg>
                                </span>
                            </Link>
                            <button to="#" className="form-control mb-3 py-2-5 d-flex justify-content-between" onClick={handleLogout}>
                                <span className="text-start text-danger">Выйти</span>
                            </button>
                        </div>
                    </div>

                    {/* AvatarModal */}
                    <div className="modal fade" id="avatarModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Редактирование</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-4">
                                    <div className="col-5">{renderAvatar()}</div>
                                    <div className="col-7">{OptionsAvatar}</div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Сохранить</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
