export const checkIsTextClamped = (element: HTMLElement): boolean => {
  return element.scrollHeight > element.clientHeight;
};

export const currencyFormater = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export const formatPrice = (value: string) => {
  const numericValue = value.replace(/\D/g, "");
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const paginateArray = (array, itemsPerPage) => {
  if (array.length === 0) {
    return "Products not found";
  }
  return array.reduce((result, item, index) => {
    const pageIndex = Math.floor(index / itemsPerPage);
    if (!result[pageIndex]) {
      result[pageIndex] = [];
    }
    result[pageIndex].push(item);
    return result;
  }, []);
};

export const startPage = (currentPage, maxIndicators, totalPages) => {
  return Math.max(0, Math.min(currentPage - Math.floor(maxIndicators / 2), totalPages - maxIndicators));
};

export const endPage = (startPage, maxIndicators, totalPages) => {
  return Math.min(startPage + maxIndicators, totalPages);
};

export const calculateAverageRatingShop = (products) => {
  const validRatings = products.map((product) => product.rating).filter((rating) => typeof rating === "number" && !isNaN(rating));

  const totalRating = validRatings.reduce((sum, rating) => sum + rating, 0);

  const averageRating = validRatings.length > 0 ? totalRating / validRatings.length : 0;

  return { totalRating, averageRating };
};
