export const customeTheme = {
  input: {
    styles: {
      base: {
        container: {
          height: "h-20",
        },
        input: {
          color: "text-black",
          fontSize: "tablet:text-base",
        },
        label: {
          color: "peer-placeholder-shown:text-blue-gray-500",
        },
      },
      variants: {
        outlined: {
          base: {
            input: {
              floated: {
                borderColor: "border-t-transparent focus:border-black focus:border-t-transparent",
              },
            },

            label: {
              floated: {
                fontSize: "text-[11px] text-blue-gray-500 peer-focus:text-[11px] peer-focus:text-black",
              },
              before: {
                borderColor: "peer-placeholder-shown:before:border-transparent peer-focus:before:border-black",
              },
              after: {
                borderColor: "peer-placeholder-shown:after:border-transparent peer-focus:after:border-black ",
              },
            },
          },
          size: {
            md: {
              input: {
                // fontSize: "tablet:text-base",
              },
            },
          },
        },
      },
    },
  },
  textarea: {
    styles: {
      base: {
        container: {
          height: "h-[120px]",
        },
        textarea: {
          color: "text-black",
        },
        label: {
          color: "peer-placeholder-shown:text-blue-gray-500",
        },
      },
      variants: {
        outlined: {
          base: {
            textarea: {
              floated: {
                borderColor: "border-t-transparent focus:border-black focus:border-t-transparent",
              },
            },

            label: {
              floated: {
                fontSize: "text-[11px] text-blue-gray-500 peer-focus:text-[11px] peer-focus:text-black",
              },
              before: {
                borderColor: "peer-placeholder-shown:before:border-transparent peer-focus:before:border-black",
              },
              after: {
                borderColor: "peer-placeholder-shown:after:border-transparent peer-focus:after:border-black ",
              },
            },
          },
        },
      },
    },
  },
  select: {
    styles: {
      base: {
        container: {
          height: "h-20",
        },
        arrow: {
          initial: {
            right: "right-4",
            width: "w-10",
            height: "h-10",
          },
        },
        menu: {
          fontSize: "tablet:text-base",
        },
      },
    },
  },
};
