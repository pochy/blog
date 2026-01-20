/** Date と string の両方を受け取り、Date に正規化 */
const toDate = (value: string | Date): Date =>
  value instanceof Date ? value : new Date(value);

/** dateTime 属性用。サーバー・クライアントで同一の ISO 8601 文字列を返し、ハイドレーション不整合を防ぐ */
export const toISODateTime = (value: string | Date): string =>
  toDate(value).toISOString();

export const formatDate = (date: string | Date) => {
  const formattedDate = toDate(date).toLocaleString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  });
  return formattedDate;
};

/** 日付と時分（個別記事などで使用） */
export const formatDateTime = (date: string | Date) => {
  return toDate(date).toLocaleString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tokyo",
  });
};
