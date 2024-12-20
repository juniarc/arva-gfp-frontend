// import { Product, User } from "@/types/types";

// export const products: Product[] = [
//   {
//     id: 1,
//     name: "Banan fruits Banan fruitsBanan fruitsBanan fruitsBanan fruits",
//     category: "fruit",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
//     price: 100,
//     imageUrl: [
//       "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
//       "https://fastly.picsum.photos/id/243/200/200.jpg?hmac=fW5ZwzzyTBy2t2MROp988oq12mZnKwN0coFLhZEE87s",
//       "https://fastly.picsum.photos/id/532/200/200.jpg?hmac=PPwpqfjXOagQmhd_K7H4NXyA4B6svToDi1IbkDW2Eos",
//     ],
//     stocks: 15,
//     unit: "kg",
//     discount: 10,
//     rating: 4.5,
//     isWishlist: false,
//     shippingInfo: {
//       packageWeight: 1,
//       packageHeight: 1,
//       packageWidth: 1,
//       packageLength: 1,
//       shippingFee: 10000,
//     },
//     variants: [
//       {
//         id: 1,
//         name: "Red",
//         price: 100,
//       },
//       {
//         id: 2,
//         name: "Green",
//         price: 100,
//       },
//       {
//         id: 3,
//         name: "Yellow",
//         price: 100,
//       },
//     ],
//     shop: {
//       id: 1,
//       name: "Shop 1",
//       imageUrl: "https://fastly.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
//       addressCity: "jakarta",
//       shippingChannel: ["JNE", "J&T", "Ninja Express"],
//     },
//     sold: 10,
//     tags: ["fruit", "vegetable"],
//   },
//   {
//     id: 2,
//     name: "Banan fruits Banan fruitsBanan fruitsBanan fruitsBanan fruits",
//     category: "vegetable",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
//     price: 100,
//     imageUrl: [
//       "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
//       "https://fastly.picsum.photos/id/243/200/200.jpg?hmac=fW5ZwzzyTBy2t2MROp988oq12mZnKwN0coFLhZEE87s",
//       "https://fastly.picsum.photos/id/532/200/200.jpg?hmac=PPwpqfjXOagQmhd_K7H4NXyA4B6svToDi1IbkDW2Eos",
//     ],
//     stocks: 15,
//     unit: "kg",
//     discount: 10,
//     rating: 4.5,
//     isWishlist: false,
//     shippingInfo: {
//       packageWeight: 1,
//       packageHeight: 1,
//       packageWidth: 1,
//       packageLength: 1,
//       shippingFee: 10000,
//     },
//     variants: [
//       {
//         id: 1,
//         name: "Red",
//         price: 100,
//       },
//       {
//         id: 2,
//         name: "Green",
//         price: 100,
//       },
//       {
//         id: 3,
//         name: "Yellow",
//         price: 100,
//       },
//     ],
//     shop: {
//       id: 1,
//       name: "Shop 1",
//       imageUrl: "https://fastly.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
//       addressCity: "jakarta",
//       shippingChannel: ["JNE", "J&T", "Ninja Express"],
//     },
//     sold: 10,
//     tags: ["fruit", "vegetable"],
//   },
//   {
//     id: 3,
//     name: "Banan fruits Banan fruitsBanan fruitsBanan fruitsBanan fruits",
//     category: "fruit",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
//     price: 100,
//     imageUrl: [
//       "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
//       "https://fastly.picsum.photos/id/243/200/200.jpg?hmac=fW5ZwzzyTBy2t2MROp988oq12mZnKwN0coFLhZEE87s",
//       "https://fastly.picsum.photos/id/532/200/200.jpg?hmac=PPwpqfjXOagQmhd_K7H4NXyA4B6svToDi1IbkDW2Eos",
//     ],
//     stocks: 15,
//     unit: "kg",
//     discount: 10,
//     rating: 4.5,
//     isWishlist: false,
//     shippingInfo: {
//       packageWeight: 1,
//       packageHeight: 1,
//       packageWidth: 1,
//       packageLength: 1,
//       shippingFee: 10000,
//     },
//     variants: [
//       {
//         id: 1,
//         name: "Red",
//         price: 100,
//       },
//       {
//         id: 2,
//         name: "Green",
//         price: 100,
//       },
//       {
//         id: 3,
//         name: "Yellow",
//         price: 100,
//       },
//     ],
//     shop: {
//       id: 1,
//       name: "Shop 1",
//       imageUrl: "https://fastly.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
//       addressCity: "jakarta",
//       shippingChannel: ["JNE", "J&T", "Ninja Express"],
//     },
//     sold: 10,
//     tags: ["fruit", "vegetable"],
//   },
//   {
//     id: 4,
//     name: "Banan fruits Banan fruitsBanan fruitsBanan fruitsBanan fruits",
//     category: "fruit",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
//     price: 100,
//     imageUrl: [
//       "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
//       "https://fastly.picsum.photos/id/243/200/200.jpg?hmac=fW5ZwzzyTBy2t2MROp988oq12mZnKwN0coFLhZEE87s",
//       "https://fastly.picsum.photos/id/532/200/200.jpg?hmac=PPwpqfjXOagQmhd_K7H4NXyA4B6svToDi1IbkDW2Eos",
//     ],
//     stocks: 15,
//     unit: "kg",
//     discount: 10,
//     rating: 4.5,
//     isWishlist: false,
//     shippingInfo: {
//       packageWeight: 1,
//       packageHeight: 1,
//       packageWidth: 1,
//       packageLength: 1,
//       shippingFee: 10000,
//     },
//     variants: [
//       {
//         id: 1,
//         name: "Red",
//         price: 100,
//       },
//       {
//         id: 2,
//         name: "Green",
//         price: 100,
//       },
//       {
//         id: 3,
//         name: "Yellow",
//         price: 100,
//       },
//     ],
//     shop: {
//       id: 1,
//       name: "Shop 1",
//       imageUrl: "https://fastly.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
//       addressCity: "jakarta",
//       shippingChannel: ["JNE", "J&T", "Ninja Express"],
//     },
//     sold: 10,
//     tags: ["fruit", "vegetable"],
//   },
//   {
//     id: 5,
//     name: "Banan fruits Banan fruitsBanan fruitsBanan fruitsBanan fruits",
//     category: "vegetable",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
//     price: 100,
//     imageUrl: [
//       "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
//       "https://fastly.picsum.photos/id/243/200/200.jpg?hmac=fW5ZwzzyTBy2t2MROp988oq12mZnKwN0coFLhZEE87s",
//       "https://fastly.picsum.photos/id/532/200/200.jpg?hmac=PPwpqfjXOagQmhd_K7H4NXyA4B6svToDi1IbkDW2Eos",
//     ],
//     stocks: 15,
//     unit: "kg",
//     discount: 10,
//     rating: 4.5,
//     isWishlist: false,
//     shippingInfo: {
//       packageWeight: 1,
//       packageHeight: 1,
//       packageWidth: 1,
//       packageLength: 1,
//       shippingFee: 10000,
//     },
//     variants: [
//       {
//         id: 1,
//         name: "Red",
//         price: 100,
//       },
//       {
//         id: 2,
//         name: "Green",
//         price: 100,
//       },
//       {
//         id: 3,
//         name: "Yellow",
//         price: 100,
//       },
//     ],
//     shop: {
//       id: 1,
//       name: "Shop 1",
//       imageUrl: "https://fastly.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
//       addressCity: "jakarta",
//       shippingChannel: ["JNE", "J&T", "Ninja Express"],
//     },
//     sold: 10,
//     tags: ["fruit", "vegetable"],
//   },
//   {
//     id: 6,
//     name: "Banan fruits Banan fruitsBanan fruitsBanan fruitsBanan fruits",
//     category: "fruit",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
//     price: 100,
//     imageUrl: [
//       "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
//       "https://fastly.picsum.photos/id/243/200/200.jpg?hmac=fW5ZwzzyTBy2t2MROp988oq12mZnKwN0coFLhZEE87s",
//       "https://fastly.picsum.photos/id/532/200/200.jpg?hmac=PPwpqfjXOagQmhd_K7H4NXyA4B6svToDi1IbkDW2Eos",
//     ],
//     stocks: 15,
//     unit: "kg",
//     discount: 10,
//     rating: 4.5,
//     isWishlist: false,
//     shippingInfo: {
//       packageWeight: 1,
//       packageHeight: 1,
//       packageWidth: 1,
//       packageLength: 1,
//       shippingFee: 10000,
//     },
//     variants: [
//       {
//         id: 1,
//         name: "Red",
//         price: 100,
//       },
//       {
//         id: 2,
//         name: "Green",
//         price: 100,
//       },
//       {
//         id: 3,
//         name: "Yellow",
//         price: 100,
//       },
//     ],
//     shop: {
//       id: 1,
//       name: "Shop 1",
//       imageUrl: "https://fastly.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
//       addressCity: "jakarta",
//       shippingChannel: ["JNE", "J&T", "Ninja Express"],
//     },
//     sold: 10,
//     tags: ["fruit", "vegetable"],
//   },
//   {
//     id: 7,
//     name: "Banan fruits Banan fruitsBanan fruitsBanan fruitsBanan fruits",
//     category: "fruit",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
//     price: 100,
//     imageUrl: [
//       "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
//       "https://fastly.picsum.photos/id/243/200/200.jpg?hmac=fW5ZwzzyTBy2t2MROp988oq12mZnKwN0coFLhZEE87s",
//       "https://fastly.picsum.photos/id/532/200/200.jpg?hmac=PPwpqfjXOagQmhd_K7H4NXyA4B6svToDi1IbkDW2Eos",
//     ],
//     stocks: 15,
//     unit: "kg",
//     discount: 10,
//     rating: 4.5,
//     isWishlist: false,
//     shippingInfo: {
//       packageWeight: 1,
//       packageHeight: 1,
//       packageWidth: 1,
//       packageLength: 1,
//       shippingFee: 10000,
//     },
//     variants: [
//       {
//         id: 1,
//         name: "Red",
//         price: 100,
//       },
//       {
//         id: 2,
//         name: "Green",
//         price: 100,
//       },
//       {
//         id: 3,
//         name: "Yellow",
//         price: 100,
//       },
//     ],
//     shop: {
//       id: 1,
//       name: "Shop 1",
//       imageUrl: "https://fastly.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
//       addressCity: "jakarta",
//       shippingChannel: ["JNE", "J&T", "Ninja Express"],
//     },
//     sold: 10,
//     tags: ["fruit", "vegetable"],
//   },
//   {
//     id: 8,
//     name: "Banan fruits Banan fruitsBanan fruitsBanan fruitsBanan fruits",
//     category: "fruit",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
//     price: 100,
//     imageUrl: [
//       "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
//       "https://fastly.picsum.photos/id/243/200/200.jpg?hmac=fW5ZwzzyTBy2t2MROp988oq12mZnKwN0coFLhZEE87s",
//       "https://fastly.picsum.photos/id/532/200/200.jpg?hmac=PPwpqfjXOagQmhd_K7H4NXyA4B6svToDi1IbkDW2Eos",
//     ],
//     stocks: 15,
//     unit: "kg",
//     discount: 10,
//     rating: 4.5,
//     isWishlist: false,
//     shippingInfo: {
//       packageWeight: 1,
//       packageHeight: 1,
//       packageWidth: 1,
//       packageLength: 1,
//       shippingFee: 10000,
//     },
//     variants: [
//       {
//         id: 1,
//         name: "Red",
//         price: 100,
//       },
//       {
//         id: 2,
//         name: "Green",
//         price: 100,
//       },
//       {
//         id: 3,
//         name: "Yellow",
//         price: 100,
//       },
//     ],
//     shop: {
//       id: 1,
//       name: "Shop 1",
//       imageUrl: "https://fastly.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
//       addressCity: "jakarta",
//       shippingChannel: ["JNE", "J&T", "Ninja Express"],
//     },
//     sold: 10,
//     tags: ["fruit", "vegetable"],
//   },
//   {
//     id: 9,
//     name: "Banan fruits Banan fruitsBanan fruitsBanan fruitsBanan fruits",
//     category: "fruit",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
//     price: 100,
//     imageUrl: [
//       "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
//       "https://fastly.picsum.photos/id/243/200/200.jpg?hmac=fW5ZwzzyTBy2t2MROp988oq12mZnKwN0coFLhZEE87s",
//       "https://fastly.picsum.photos/id/532/200/200.jpg?hmac=PPwpqfjXOagQmhd_K7H4NXyA4B6svToDi1IbkDW2Eos",
//     ],
//     stocks: 15,
//     unit: "kg",
//     discount: 10,
//     rating: 4.5,
//     isWishlist: false,
//     shippingInfo: {
//       packageWeight: 1,
//       packageHeight: 1,
//       packageWidth: 1,
//       packageLength: 1,
//       shippingFee: 10000,
//     },
//     variants: [
//       {
//         id: 1,
//         name: "Red",
//         price: 100,
//       },
//       {
//         id: 2,
//         name: "Green",
//         price: 100,
//       },
//       {
//         id: 3,
//         name: "Yellow",
//         price: 100,
//       },
//     ],
//     shop: {
//       id: 1,
//       name: "Shop 1",
//       imageUrl: "https://fastly.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
//       addressCity: "jakarta",
//       shippingChannel: ["JNE", "J&T", "Ninja Express"],
//     },
//     sold: 10,
//     tags: ["fruit", "vegetable"],
//   },
//   {
//     id: 10,
//     name: "Banan fruits Banan fruitsBanan fruitsBanan fruitsBanan fruits",
//     category: "vegetable",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
//     price: 100,
//     imageUrl: [
//       "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
//       "https://fastly.picsum.photos/id/243/200/200.jpg?hmac=fW5ZwzzyTBy2t2MROp988oq12mZnKwN0coFLhZEE87s",
//       "https://fastly.picsum.photos/id/532/200/200.jpg?hmac=PPwpqfjXOagQmhd_K7H4NXyA4B6svToDi1IbkDW2Eos",
//     ],
//     stocks: 15,
//     unit: "kg",
//     discount: 10,
//     rating: 4.5,
//     isWishlist: false,
//     shippingInfo: {
//       packageWeight: 1,
//       packageHeight: 1,
//       packageWidth: 1,
//       packageLength: 1,
//       shippingFee: 10000,
//     },
//     variants: [
//       {
//         id: 1,
//         name: "Red",
//         price: 100,
//       },
//       {
//         id: 2,
//         name: "Green",
//         price: 100,
//       },
//       {
//         id: 3,
//         name: "Yellow",
//         price: 100,
//       },
//     ],
//     shop: {
//       id: 1,
//       name: "Shop 1",
//       imageUrl: "https://fastly.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
//       addressCity: "jakarta",
//       shippingChannel: ["JNE", "J&T", "Ninja Express"],
//     },
//     sold: 10,
//     tags: ["fruit", "vegetable"],
//   },
//   {
//     id: 11,
//     name: "Banan fruits Banan fruitsBanan fruitsBanan fruitsBanan fruits",
//     category: "vegetable",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
//     price: 100,
//     imageUrl: [
//       "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
//       "https://fastly.picsum.photos/id/243/200/200.jpg?hmac=fW5ZwzzyTBy2t2MROp988oq12mZnKwN0coFLhZEE87s",
//       "https://fastly.picsum.photos/id/532/200/200.jpg?hmac=PPwpqfjXOagQmhd_K7H4NXyA4B6svToDi1IbkDW2Eos",
//     ],
//     stocks: 15,
//     unit: "kg",
//     discount: 10,
//     rating: 4.5,
//     isWishlist: false,
//     shippingInfo: {
//       packageWeight: 1,
//       packageHeight: 1,
//       packageWidth: 1,
//       packageLength: 1,
//       shippingFee: 10000,
//     },
//     variants: [
//       {
//         id: 1,
//         name: "Red",
//         price: 100,
//       },
//       {
//         id: 2,
//         name: "Green",
//         price: 100,
//       },
//       {
//         id: 3,
//         name: "Yellow",
//         price: 100,
//       },
//     ],
//     shop: {
//       id: 1,
//       name: "Shop 1",
//       imageUrl: "https://fastly.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
//       addressCity: "jakarta",
//       shippingChannel: ["JNE", "J&T", "Ninja Express"],
//     },
//     sold: 10,
//     tags: ["fruit", "vegetable"],
//   },
//   {
//     id: 12,
//     name: "Banan fruits Banan fruitsBanan fruitsBanan fruitsBanan fruits",
//     category: "vegetable",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
//     price: 100,
//     imageUrl: [
//       "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
//       "https://fastly.picsum.photos/id/243/200/200.jpg?hmac=fW5ZwzzyTBy2t2MROp988oq12mZnKwN0coFLhZEE87s",
//       "https://fastly.picsum.photos/id/532/200/200.jpg?hmac=PPwpqfjXOagQmhd_K7H4NXyA4B6svToDi1IbkDW2Eos",
//     ],
//     stocks: 15,
//     unit: "kg",
//     discount: 10,
//     rating: 4.5,
//     isWishlist: false,
//     shippingInfo: {
//       packageWeight: 1,
//       packageHeight: 1,
//       packageWidth: 1,
//       packageLength: 1,
//       shippingFee: 10000,
//     },
//     variants: [
//       {
//         id: 1,
//         name: "Red",
//         price: 100,
//       },
//       {
//         id: 2,
//         name: "Green",
//         price: 100,
//       },
//       {
//         id: 3,
//         name: "Yellow",
//         price: 100,
//       },
//     ],
//     shop: {
//       id: 1,
//       name: "Shop 1",
//       imageUrl: "https://fastly.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
//       addressCity: "jakarta",
//       shippingChannel: ["JNE", "J&T", "Ninja Express"],
//     },
//     sold: 10,
//     tags: ["fruit", "vegetable"],
//   },
//   {
//     id: 13,
//     name: "Banan fruits Banan fruitsBanan fruitsBanan fruitsBanan fruits",
//     category: "vegetable",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
//     price: 100,
//     imageUrl: [
//       "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
//       "https://fastly.picsum.photos/id/243/200/200.jpg?hmac=fW5ZwzzyTBy2t2MROp988oq12mZnKwN0coFLhZEE87s",
//       "https://fastly.picsum.photos/id/532/200/200.jpg?hmac=PPwpqfjXOagQmhd_K7H4NXyA4B6svToDi1IbkDW2Eos",
//     ],
//     stocks: 15,
//     unit: "kg",
//     discount: 10,
//     rating: 4.5,
//     isWishlist: false,
//     shippingInfo: {
//       packageWeight: 1,
//       packageHeight: 1,
//       packageWidth: 1,
//       packageLength: 1,
//       shippingFee: 10000,
//     },
//     variants: [
//       {
//         id: 1,
//         name: "Red",
//         price: 100,
//       },
//       {
//         id: 2,
//         name: "Green",
//         price: 100,
//       },
//       {
//         id: 3,
//         name: "Yellow",
//         price: 100,
//       },
//     ],
//     shop: {
//       id: 1,
//       name: "Shop 1",
//       imageUrl: "https://fastly.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
//       addressCity: "jakarta",
//       shippingChannel: ["JNE", "J&T", "Ninja Express"],
//     },
//     sold: 10,
//     tags: ["fruit", "vegetable"],
//   },
//   {
//     id: 14,
//     name: "Banan fruits Banan fruitsBanan fruitsBanan fruitsBanan fruits",
//     category: "vegetable",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
//     price: 100,
//     imageUrl: [
//       "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
//       "https://fastly.picsum.photos/id/243/200/200.jpg?hmac=fW5ZwzzyTBy2t2MROp988oq12mZnKwN0coFLhZEE87s",
//       "https://fastly.picsum.photos/id/532/200/200.jpg?hmac=PPwpqfjXOagQmhd_K7H4NXyA4B6svToDi1IbkDW2Eos",
//     ],
//     stocks: 15,
//     unit: "kg",
//     discount: 10,
//     rating: 4.5,
//     isWishlist: false,
//     shippingInfo: {
//       packageWeight: 1,
//       packageHeight: 1,
//       packageWidth: 1,
//       packageLength: 1,
//       shippingFee: 10000,
//     },
//     variants: [
//       {
//         id: 1,
//         name: "Red",
//         price: 100,
//       },
//       {
//         id: 2,
//         name: "Green",
//         price: 100,
//       },
//       {
//         id: 3,
//         name: "Yellow",
//         price: 100,
//       },
//     ],
//     shop: {
//       id: 1,
//       name: "Shop 1",
//       imageUrl: "https://fastly.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
//       addressCity: "jakarta",
//       shippingChannel: ["JNE", "J&T", "Ninja Express"],
//     },
//     sold: 10,
//     tags: ["fruit", "vegetable"],
//   },
//   {
//     id: 15,
//     name: "Banan fruits Banan fruitsBanan fruitsBanan fruitsBanan fruits",
//     category: "vegetable",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
//     price: 100,
//     imageUrl: [
//       "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
//       "https://fastly.picsum.photos/id/243/200/200.jpg?hmac=fW5ZwzzyTBy2t2MROp988oq12mZnKwN0coFLhZEE87s",
//       "https://fastly.picsum.photos/id/532/200/200.jpg?hmac=PPwpqfjXOagQmhd_K7H4NXyA4B6svToDi1IbkDW2Eos",
//     ],
//     stocks: 15,
//     unit: "kg",
//     discount: 10,
//     rating: 4.5,
//     isWishlist: false,
//     shippingInfo: {
//       packageWeight: 1,
//       packageHeight: 1,
//       packageWidth: 1,
//       packageLength: 1,
//       shippingFee: 10000,
//     },
//     variants: [
//       {
//         id: 1,
//         name: "Red",
//         price: 100,
//       },
//       {
//         id: 2,
//         name: "Green",
//         price: 100,
//       },
//       {
//         id: 3,
//         name: "Yellow",
//         price: 100,
//       },
//     ],
//     shop: {
//       id: 1,
//       name: "Shop 1",
//       imageUrl: "https://fastly.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
//       addressCity: "jakarta",
//       shippingChannel: ["JNE", "J&T", "Ninja Express"],
//     },
//     sold: 10,
//     tags: ["fruit", "vegetable"],
//   },
// ];

// export const mockApiRequest = (
//   endpoint: string,
//   options?: { category?: string; limit?: number; id?: number },
//   delay = 300,
// ): Promise<Product[] | Product> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (endpoint === "/products") {
//         let result = products;

//         // Filter by category if provided
//         if (options?.category) {
//           result = result.filter((product) => product.category === options.category);
//         }

//         // Apply limit if provided
//         if (options?.limit) {
//           result = result.slice(0, options.limit);
//         }

//         // Filter by id if provided
//         if (options?.id !== undefined) {
//           const product = result.find((product) => product.id === options.id);
//           if (product) {
//             resolve(product);
//           }
//         }

//         resolve(result);
//       } else {
//         reject(new Error("Endpoint not found"));
//       }
//     }, delay);
//   });
// };

// const user: User = {
//   id: 1,
//   name: "John Doe",
//   email: "tMmGg@example.com",
//   imageUrl: "exampple.com",
//   username: "username",
//   phoneNumber: "08123456789",
//   addressLabel: "Home",
//   addressStreet: "Jl. Contoh",
//   addressSubdistrict: "Kel. Contoh",
//   addressDistrict: "Kec. Contoh",
//   addressCity: "Jakarta",
//   addressProvince: "Provinsi Contoh",
//   zipCode: 12345,
// };

// const shop = {
//   id: 1,
//   userId: 1,
//   name: "Shop 1",
//   imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
//   phoneNumber: "08123456789",
//   addressLabel: "",
//   addressStreet: "Jl. Contoh",
//   addressSubdistrict: "Kel. Contoh",
//   addressDistrict: "Kec. Contoh",
//   addressCity: "Kota Contoh",
//   addressProvince: "Provinsi Contoh",
//   zipCode: 12345,
//   openingHours: "10:00",
//   closingHours: "18:00",
//   shippingOptions: ["JNE", "J&T"],
//   createdAt: "2023-01-01",
//   description:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
//   products: [
//     {
//       id: 14,
//       name: "Papaya",
//       category: "fruit",
//       variants: ["Red", "Yellow", "Green"],

//       description: "Ripe and sweet papayas, packed with nutrients.",
//       price: 130,
//       imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
//       stocks: 150,
//       unit: "kg",
//       discount: 5,
//       rating: 4.1,
//       isWishlist: false,
//       shippingInfo: {
//         packageWeight: 2,
//         packageHeight: 3,
//         packageWidth: 2,
//         packageLength: 3,
//         shippingFee: 7,
//       },
//       sold: 10,
//     },
//     {
//       id: 14,
//       name: "Papaya",
//       category: "fruit",
//       variants: ["Red", "Yellow", "Green"],

//       description: "Ripe and sweet papayas, packed with nutrients.",
//       price: 130,
//       imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
//       stocks: 150,
//       unit: "kg",
//       discount: 5,
//       rating: 4.1,
//       isWishlist: false,
//       shippingInfo: {
//         packageWeight: 2,
//         packageHeight: 3,
//         packageWidth: 2,
//         packageLength: 3,
//         shippingFee: 7,
//       },
//       sold: 10,
//     },
//   ],
// };

// export const mockApiRequestUser = (endpoint: string, delay = 300): Promise<User> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (endpoint === "/user") {
//         let result = user;

//         resolve(result);
//       } else {
//         reject(new Error("Endpoint not found"));
//       }
//     }, delay);
//   });
// };

// export const mockApiRequestShop = (endpoint: string, delay = 300): any => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (endpoint === "/shop") {
//         let result = shop;

//         resolve(result);
//       } else {
//         reject(new Error("Endpoint not found"));
//       }
//     }, delay);
//   });
// };

// export const mockApiRequestPostUser = (endpoint: string, data: Partial<User>, delay = 300): Promise<User> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (endpoint === "/user") {
//         const updatedUser = {
//           ...data,
//           id: 1,
//           name: data.name || "",
//           email: data.email || "tMmGg@example.com",
//           imageUrl: data.imageUrl || "exampple.com",
//           username: data.username || "username",
//           phoneNumber: data.phoneNumber || "08123456789",
//           addressLabel: data.addressLabel || "",
//           addressStreet: data.addressStreet || "Jl. Contoh",
//           addressSubdistrict: data.addressSubdistrict || "Kel. Contoh",
//           addressDistrict: data.addressDistrict || "Kec. Contoh",
//           addressCity: data.addressCity || "Kota Contoh",
//           addressProvince: data.addressProvince || "Provinsi Contoh",
//           zipCode: data.zipCode || 12345,
//         };

//         resolve(updatedUser);
//       } else {
//         reject(new Error("Endpoint not found"));
//       }
//     }, delay);
//   });
// };

// // user cart
