module.exports = {
  // compiler: {
  //   removeConsole: {
  //     exclude: ["error"],
  //   },
  // },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  assetPrefix: "./", // makes a lot of websocket calls in dev environment, enable only for statis export
  // trailingSlash: true,
  env: {
    NEXT_PUBLIC_NID: 5,
    NEXT_PUBLIC_SCANNER_BASE: "https://polygonscan.com/tx/",
    NEXT_PUBLIC_MINTER_ADDRESS: "0x03A778BFB876fA264647453008e8b21a243d5711",
    NEXT_PUBLIC_RAFFLE_ADDRESS: "0x0f912E9415902B1dcdeE5428344d986a7B488Cb9",
    NEXT_PUBLIC_ALCHEMY_KEY2: "dQszEeRDaYb-jrYKLVP1FLqDQoBhVh1p",
    NEXT_PUBLIC_ALCHEMY_KEY: "UbKbbJpAxim12srTJ5vUo3DdQy0WPdHK",
    NEXT_PUBLIC_OS_BASE: "https://opensea.io/collection/the-croats",
    NEXT_PUBLIC_OS_ASSETS: "https://opensea.io/assets/matic/",
  },
};
