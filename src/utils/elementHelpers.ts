export const checkIsTextClamped = (element: HTMLElement): boolean => {
  return element.scrollHeight > element.clientHeight;
};

export const formatPrice = (value: string) => {
  const numericValue = value.replace(/\D/g, "");
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
