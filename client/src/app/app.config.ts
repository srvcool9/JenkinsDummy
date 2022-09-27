import { environment } from '../environments/environment';
export class AppConfig {
  // This is base microservice path for config microservice serving API Cluster
  public readonly configApiBaseUrl = environment.commonUrl ;

  // This will be a new microservice for login
  public readonly loginApiBaseUrl = environment.baseUrl + 'login';

  // This will be a new microservice for integration
  public readonly integrationApiBaseUrl = environment.baseUrl + 'integration';

  public readonly awsRegion = environment.awsregion;

  public readonly awsACL = 'public-read';

  public readonly sellerLoanTapeUploadModuleName = 'importLoanTape';

  public readonly sellerLoanDocUploadModuleName = 'importLoanDocuments';

  public readonly maxUploadFilesLimit = environment.uploadMaxFilesLimit;

  public readonly maxParallelFilesUploadLimit =
    environment.uploadMaxParallelProcessingFilesLimit;

  public readonly loanDocMaxFileSize = '250MB';

  public readonly loanTapeMaxFileSize = '3MB';

  public readonly docLibUploadModuleName = 'Admin';

  public readonly dashboardComingSoonOverlay =
    environment.dashboardComingSoonOverlay;

  public readonly importFindingsModuleName = 'importFindings';
}
