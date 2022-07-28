export const handleObjectToLocalStorage = async <T extends object>(obj: T) => {
  for await (const [key, value] of Object.entries(obj)) {
    localStorage.setItem(key, value)
  }
  return obj
}
