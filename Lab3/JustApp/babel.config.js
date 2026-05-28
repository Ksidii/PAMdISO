module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // To mówi Expo, że używamy NativeWind do zamiany klas na style
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};