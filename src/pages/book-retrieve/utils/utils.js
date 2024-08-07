export function setRecentlyBookToLocalStorage(slug, page, page_count, title) {
    const value = {"title": title, "slug":slug,"page": page, "maxPage": page_count};
    localStorage.setItem('recentlyBook', JSON.stringify(value));
}