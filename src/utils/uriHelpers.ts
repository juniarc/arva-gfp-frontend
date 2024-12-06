const uriHelpers = (() => {
  const formatStringForUrl = (string: string) => string.replace(/\s+/g, "-").toLowerCase();
  const formatUrlToString = (string: string | undefined) => string?.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const decodeUri = (string: string) => decodeURIComponent(string);

  return {
    formatStringForUrl,
    decodeUri,
    formatUrlToString,
  };
})();

export default uriHelpers;
