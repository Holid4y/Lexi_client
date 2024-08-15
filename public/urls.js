export const host = "https://lexi-service.onrender.com/api/";

// books
export const books = "books/";
export const bookmarks = books + "bookmarks/";
export const myBooks = books + 'my/'

// JWT
export const login = "jwt/create/";
export const refresh = "jwt/refresh/";
export const verify = "jwt/verify/";

// home
export const home = "home/";

// settings
export const settings = "users/settings/";

// vocabulary
export const vocabulary = "vocabulary/";
export const _delete = "delete/"
export const stats = vocabulary + "stats/";

// words
export const words = "words/";

// training
export const training = "training/";
export const info = training + "info/";

// googletrans
export const googletrans = words + "googletrans/";

// auth
export const auth = "auth/"
export const registration = auth + "users/"
export const changeEmail = "users/set_email/"
export const activation = "users/activation/"
export const resend = "users/resend_activation/"
export const changePassword = "users/set_password/"

export const send_reset_password = 'users/reset_password/'
export const reset_password_confirm = 'users/reset_password_confirm/'

//Search
export const search = 'search/'
export const searchMybook = search + myBooks //Готово
export const searchBook = search + books //Готово
export const searchBookMark = search + "bookmarks/"
export const searchVocabulary = search + vocabulary

// Эта функция полезна для получения значения определенного cookie
// из браузера, а именно для csrf токена.
export function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

/**
 * Функция для проверки состояния ответа и возврата соответствующего значения.
 *
 * @param {*} response - Ответ, который необходимо проверить.
 * @param {*} sceleton - Значение, которое нужно вернуть, если ответ отсутствует и загрузка не выполняется.
 * @param {boolean} loading - Флаг, указывающий на выполнение загрузки.
 * @param {*} error - Ошибка, которую нужно вернуть в случае ее возникновения.
 * @param {*} finaly - Ответ, который будет при отсудствии response
 * @returns {*} - Возвращает ответ, скелет, загрузку или ошибку в зависимости от состояния.
 */
export const renderResponse = (response, sceleton, loading, error, finaly) => {
    if (response != null) {
        return response;
    }
    if (!response && !loading) {
        return sceleton;
    }
    if (loading) {
        return sceleton;
    }
    if (error) {
        return error;
    }
};

export let headers = {
    "Content-type": "application/json",
    "X-CSRFToken": getCookie("csrftoken"),
};

export async function getResponse(url, method, body) {
    let headers = {
        "Content-type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
    };

    const accessToken = localStorage.getItem("access");
    if (!accessToken) {
        console.warn(`Отсутствует accessToken. Запрос на ${url}`);
    }

    const auth = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

    
    const response = await fetch(url.toString(), {
        method,
        headers: { ...headers, ...auth },
        body,
    });

    if (response.ok){
        console.log(`${method} запрос на ${url}`);
    }
        
    return response;
}
