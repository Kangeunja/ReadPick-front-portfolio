export const getLargeBookImage = (url?: string) => {
  if (!url) return "";
  url.replace("coversum", "cover500");
};
