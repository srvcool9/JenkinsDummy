 // The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const appcodes = {
  alignment: "spm-alignment-web",
  master: "spm-master",
};

export const appUrl = "http://184.168.124.155:81";
export const authUrl = "http://184.168.124.155:81";
export const javaAppUrl = "http://97.74.81.154:8080/rsk";
export const javaAuthUrl = "http://97.74.81.154:8080/rsk";
// export const javaAppUrl = "http://localhost:9092";
// export const javaAuthUrl = "http://localhost:9092";

export const environment = {
  production: false,
  environmentName: "(DEV)",
  alignmentUrl: `${appUrl}${appcodes.alignment}`,
  javaAlignmentUrl: `${javaAppUrl}${appcodes.alignment}`,
  commonUrl: `${appUrl}`,
  javaCommonUrl: `${javaAppUrl}`,
  authUrl: `${authUrl}`,
  javaAuthUrl : `${javaAuthUrl}`,
  defaultLanguage: "en-US",
  supportedLanguages: ["en-US", "fr-FR"],
  baseUrl: "http://localhost:4200/",
  awsregion: "us-east-1",
  uploadMaxFilesLimit: 20,
  uploadMaxParallelProcessingFilesLimit: 10,
  applicationTimeOut: 1000000000000, //15 min 1680 , // 28 min //180 3min
  apiRequestTimeOut: 1800000, // 30 mins in milliseconds
  apiRefreshToken: 1400000, // 23 mins in milliseconds
  dashboardComingSoonOverlay: false,
  passPhrase: "secret",
};

