export function transformKeysToCamelCase(obj) {
  for (let key in obj) {
    const newKey = key
      .split("_")
      .map((word, index) =>
        word === "id"
          ? "_" + word
          : // : word.includes("url")
          // ? word.toUpperCase()
          index
          ? word[0].toUpperCase() + word.slice(1)
          : word
      )
      .join("");
    obj[newKey] = obj[key];
    if (newKey !== key) {
      delete obj[key];
    }
  }
  return obj;
}
