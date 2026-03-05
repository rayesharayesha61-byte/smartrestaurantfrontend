const { withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");




module.exports = function withNetworkSecurityXml(config) {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const filePath = path.join(
        config.modRequest.platformProjectRoot, // This is the correct path reference
        "app/src/main/res/xml/network_security_config.xml"
      );
     
      const xmlContent = `<?xml version="1.0" encoding="utf-8"?>
      <network-security-config>
        <domain-config cleartextTrafficPermitted="true">
          <domain includeSubdomains="true">192.168.29.155</domain>
          <domain includeSubdomains="true">localhost</domain>
        </domain-config>
      </network-security-config>`;




      // Ensure directory exists
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
     
      // Write file
      fs.writeFileSync(filePath, xmlContent);
     
      return config;
    },
  ]);
};