export const checkIsTextClamped = (element: HTMLElement): boolean => {
  return element.scrollHeight > element.clientHeight;
};

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
