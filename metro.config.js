const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer")
    },
    resolver: {
      blockList: [
        /C:\\gini\\\.legacy-frontend\\.*/,
        /.*\.legacy-frontend\/.*/
      ],
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"]
    }
  };
})();
