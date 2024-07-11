export function setRecentlyBookToLocalStorage(slug, page) {
    const value = {"slug":slug,"page": page};
    localStorage.setItem('recentlyBook', JSON.stringify(value));
}