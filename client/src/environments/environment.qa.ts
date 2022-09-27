export const appcodes = {
    alignment: "spm-alignment-web",
    master: "spm-master",
  };
  
  export const appUrl = "http://184.168.124.155:81";
  export const javaAppUrl = "http://97.74.81.154:8080/rsk"
  export const javaAuthUrl = "http://97.74.81.154:8080/rsk";
  export const authUrl = "http://184.168.124.155:81";
  
  export const environment = {
    production: false,
    environmentName: "(Test)",
    alignmentUrl: `${appUrl}${appcodes.alignment}`,
    javaAlignmentUrl: `${javaAppUrl}${appcodes.alignment}`,
    commonUrl: `${appUrl}`,
    javaCommonUrl: `${javaAppUrl}`,
    authUrl: `${authUrl}`,
    javaAuthUrl : `${javaAuthUrl}`,

    defaultLanguage: "en-US",
    supportedLanguages: ["en-US", "fr-FR"],
    baseUrl: "http://184.168.124.155/",
    awsregion: "us-east-1",
    uploadMaxFilesLimit: 20,
    uploadMaxParallelProcessingFilesLimit: 10,
    applicationTimeOut: 1000000000000, //15 min 1680 , // 28 min //180 3min
    apiRequestTimeOut: 1800000, // 30 mins in milliseconds
    apiRefreshToken: 1400000, // 23 mins in milliseconds
    dashboardComingSoonOverlay: false,
    passPhrase: "secret",
  };
  