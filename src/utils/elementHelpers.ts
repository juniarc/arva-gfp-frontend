import React from "react";

export const checkIsTextClamped = (element: HTMLElement): boolean => {
  return element.scrollHeight > element.clientHeight;
};
