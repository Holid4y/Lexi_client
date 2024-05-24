(() => {
    'use strict'
  
    const getStoredTheme = () => localStorage.getItem('theme')
    const setStoredTheme = theme => localStorage.setItem('theme', theme)
  
    const getPreferredTheme = () => {
      const storedTheme = getStoredTheme()
      if (storedTheme) {
        return storedTheme
      }
  
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
  
    const setTheme = theme => {
      if (theme === 'auto') {
        document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
      } else {
        document.documentElement.setAttribute('data-bs-theme', theme)
      }
  
      // Обновить текст рядом с переключателем
      const themeText = document.getElementById('themeText')
      if (themeText) {
        themeText.textContent = theme === 'dark' ? 'Темная тема' : 'Светлая тема'
      }
    }
  
    const initializeTheme = () => {
      const theme = getPreferredTheme()
      setTheme(theme)
  
      // Установим состояние переключателя на основе текущей темы
      const themeSwitch = document.getElementById('themeSwitch')
      if (themeSwitch) {
        themeSwitch.checked = (theme === 'dark')
      }
    }
  
    const handleThemeChange = () => {
      const themeSwitch = document.getElementById('themeSwitch')
      if (themeSwitch) {
        themeSwitch.addEventListener('change', () => {
          const newTheme = themeSwitch.checked ? 'dark' : 'light'
          setStoredTheme(newTheme)
          setTheme(newTheme)
        })
      }
    }
  
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const storedTheme = getStoredTheme()
      if (storedTheme !== 'light' && storedTheme !== 'dark') {
        setTheme(getPreferredTheme())
      }
    })
  
    window.addEventListener('DOMContentLoaded', () => {
      initializeTheme()
      handleThemeChange()
    })
  })()
  