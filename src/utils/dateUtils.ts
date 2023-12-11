export const formatDate = (date: string) => {
  const formattedDate = new Date(date).toLocaleString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  return formattedDate;
};
