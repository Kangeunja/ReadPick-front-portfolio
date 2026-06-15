export const getLargeBookImage = (url?: string) => {
  if (!url) return '';
  return url.replace('coversum', 'cover500');
};
