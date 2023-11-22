const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "The Croats";
const description = "Bespoke collection of Croatian nation";
const baseUri =
  "https://bah5acgzaolutqsfwjlmlaa342cumtx7bj63gonixw354xnbkmy44tdih3nma.bzz.link";

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

const layerConfigurations = [
  {
    growEditionSizeTo: 1000,
    layersOrder: [
      {
        name: "m/background",
        options: {
          displayName: "Background",
        },
      },
      {
        name: "m/skin",
        options: {
          displayName: "Skin",
        },
      },
      {
        name: "m/beard",
        options: {
          displayName: "Beard",
        },
      },
      {
        name: "m/eyes",
        options: {
          displayName: "Eyes",
        },
      },
      {
        name: "m/ears",
        options: {
          displayName: "Ears",
        },
      },
      {
        name: "m/mouth",
        options: {
          displayName: "Mouth",
        },
      },
      {
        name: "m/blemishes",
        options: {
          displayName: "Blemishes",
        },
      },
      {
        name: "m/neck",
        options: {
          displayName: "Neck",
        },
      },
      {
        name: "m/hair",
        options: {
          displayName: "Hair",
        },
      },
      {
        name: "m/mouthprop",
        options: {
          displayName: "Mouthprop",
        },
      },
    ],
  },
  {
    growEditionSizeTo: 2000,
    layersOrder: [
      {
        name: "f/background",
        options: {
          displayName: "Background",
        },
      },
      {
        name: "f/skin",
        options: {
          displayName: "Skin",
        },
      },
      {
        name: "f/eyes",
        options: {
          displayName: "Eyes",
        },
      },
      {
        name: "f/ears",
        options: {
          displayName: "Ears",
        },
      },
      {
        name: "f/mouth",
        options: {
          displayName: "Mouth",
        },
      },
      {
        name: "f/blemishes",
        options: {
          displayName: "Blemishes",
        },
      },
      {
        name: "f/neck",
        options: {
          displayName: "Neck",
        },
      },
      {
        name: "f/hair",
        options: {
          displayName: "Hair",
        },
      },
      {
        name: "f/mouthprop",
        options: {
          displayName: "Mouthprop",
        },
      },
    ],
  },
];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 240,
  height: 240,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: false,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 25,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
};
