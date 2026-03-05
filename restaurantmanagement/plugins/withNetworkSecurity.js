const { withAndroidManifest } = require("@expo/config-plugins");


module.exports = function withNetworkSecurity(config) {
  return withAndroidManifest(config, (config) => {
    const app = config.modResults.manifest.application[0];
    app.$["android:networkSecurityConfig"] = "@xml/network_security_config";
    return config;
  });
};