export const isValidHttpUrl = (string: string) => {
  try {
    const newUrl = new URL(string);
    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
};

export const makeShortUrl = (length: any) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getValidUrl = (link: string) => {
  if (link.indexOf("http://") == 0 || link.indexOf("https://") == 0) {
    return link;
  } else {
    return `https://${link}`;
  }
};
