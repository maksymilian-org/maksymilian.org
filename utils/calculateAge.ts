export const calculateAge = (birthday: string) => {
  const ageDiff = Date.now() - new Date(birthday).getTime();
  const ageDate = new Date(ageDiff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
