export function changeHistory(path: string) {
  if(path === location.pathname) {
    history.replaceState(null, '', path)
  } else {
    history.pushState(null, '', path)
  }
}
