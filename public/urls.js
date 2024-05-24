export const host = "http://127.0.0.1:8000/api/";

// books
export const books = "books/";
export const bookmarks = "users/bookmarks/";

// JWT
export const login = "jwt/create/"
export const refresh = "jwt/refresh/"
export const verify = "jwt/verify/"



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

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2NzM4Mzk5LCJpYXQiOjE3MTYxMzM1OTksImp0aSI6IjkzZWRlZDg2OTEyNzRmYTE5M2Y5MjlkZTI4Y2MzOTA5IiwidXNlcl9pZCI6MzF9.8KnGYQ5-QUhGquFakO9U_eInx4F5QcKLKLBq3pdyq48";

export let headers = {
  "Content-type": "application/json",
  "X-CSRFToken": getCookie("csrftoken"),
  Authorization: `Beare ${token}`,
};
