// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  localStorage.setItem('theme', 'dark')
  document.documentElement.classList.add('dark')
} else {
  localStorage.setItem('theme', 'light')
  document.documentElement.classList.remove('dark')
}
// Whenever the user explicitly chooses light mode
//localStorage.setItem('theme', 'light')
