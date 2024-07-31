function getAge(date) {
  if (!date) {
    return 0;
  }

  const [year, month, _] = date.split("-");
  const currentDate = new Date();
  let age = currentDate.getFullYear() - Number(year);
  if (currentDate.getMonth() + 1 < Number(month)) {
    age += 1;
  }
  return age;
}

export default getAge;
