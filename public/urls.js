export const host = "http://127.0.0.1:8000/api/";

// books
export const books = "books/";
export const bookmarks = "users/bookmarks/";

// JWT
export const login = "jwt/create/"
export const refresh = "jwt/refresh/"
export const verify = "jwt/verify/"

// home
export const home = "home/"

// user
export const user = "user/me/"
export const settings = "users/settings/"
export const dictionaryLevels = settings + "dictionary-levels/"

// vocabulary
export const vocabulary = "vocabulary/"
export const stats = vocabulary + "stats/"


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
 * @returns {*} - Возвращает ответ, скелет, загрузку или ошибку в зависимости от состояния.
 */
export const renderResponse = (response, sceleton, loading, error) => {
  if (response) {
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
  Authorization: `Beare ${localStorage.getItem('access')}`,
};
