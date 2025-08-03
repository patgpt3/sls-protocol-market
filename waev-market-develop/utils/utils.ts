export const toHex = (str: string): string => {
  let result = "";
  if (!str || str?.length === 0) {
    return "";
  }
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
};

export const replaceSpecialCharacters = (item?: string, r?: string) => {
  return item && item.length > 0
    ? item.replace(/[^a-zA-Z0-9]/g, r || "")
    : item;
};
