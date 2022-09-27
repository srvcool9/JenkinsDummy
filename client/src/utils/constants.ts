/**
 * This class defines application clonstants
 */
  export class Constants {
  public static NO_WHITE_SPACE_PATTERN = /^[a-zA-Z0-9\S]+(\s+[a-zA-Z0-9\S]+)*$/;
  // public static EMAIL_PATTERN = /[^@]+@[^@]+\.[a-zA-Z]{1,}$/,^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$;
  public static EMAIL_PATTERN= /^(?![0-9]+@)([a-z0-9а-я_.-]{4,100})@([a-zа-я_]{2,15})\.([a-zа-я]{2,15})(\.[a-zа-я]{2,9})?$/;
  public static PHONE_PATTERN = /^\([1-9]\d{2}\)\s\d{3}-\d{4}$/;
  
  public static PAGE_TIME_INTERVAL = 30000;
  public static PAGE_LOADING = "Loading...";
  public static PAGE_PROCESSING = "Processing...";

  public static PAGE_STATUS_NEW = "New";
  public static PAGE_STATUS_PROGRESS = "In Process";
  public static PAGE_STATUS_COMPLETED = "Complete";

  public static PHONE = "(000) 000-0000";
  public static ZIP_CODE = "00000";

  public static SSN = "XXX-XX-0000";
  public static MIN_NO = "0000000-0000000000-0";
  public static CURRENCY = "separator.2";
  public static CURRENCY_PREFIX = "$ ";
  public static CURRENCY_SEPARATOR = ",";
  public static PERCENTAGE_SUFIX = "%";

  public static DATE = "M0/d0/0000";
  public static DATE_TIME24 = "M0/d0/0000 00:00:00";
  public static DATE_PICKER = "MM/DD/YYYY";

  public static LOAN_TERM_YRS = "^[0-9]{1,6}$";
  public static LOAN_TERM_MNTHS = "^[0-9]{1,6}$";

  public static NUMBER = "separator.0";
  public static PERCENTAGES = "separator.3";
  public static PERCENTAGE_2 = "separator.2";
  public static PERCENTAGE_3 = "separator.3";
  public static PERCENTAGE_4 = "separator.4";
  public static PERCENT_PATTERN = "^(?:100|\\d{1,2})(?:\\.\\d{1,3})?$";
  public static VIEW_TRANSACTION_EXCEL_FILE_NAME = "transaction.xlsx";
  public static VIEW_TRANSACTION_FINDING_EXCEL_FILE_NAME =
    "transaction_findings.xlsx";
  public static VIEW_LOAN_FINDING_EXCEL_FILE_NAME = "loan_findings.xlsx";
  public static VIEW_LOAN_DETAILS_EXCEL_FILE_NAME = "loan_details.xlsx";

  public static START_PAGE = "Start";
  public static COMPLETE_PAGE = "Complete";

  public static ASC_GOV_LINK =
    "https://www.asc.gov/National-Registries/FindAnAppraiser.aspx";
}
