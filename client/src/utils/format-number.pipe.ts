import { Pipe, PipeTransform } from "@angular/core";
import { formatCurrency, DatePipe } from "@angular/common";

@Pipe({
  name: "formatNumber",
})
export class FormatNumberPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}
  transform(value: any, formatNumber): string {
    if (formatNumber == "currency") {
      if (value != null) {
        value = formatCurrency(value, "en", "$"); //.replace(/\.00/, "");
        return value;
      }
    }

    if (formatNumber == "ssn") {
      if (value) {
        let toBeReplaced = value.slice(0, 5);
        return value.replace(toBeReplaced, "***-**-");
      }
    }

    if (formatNumber == "phone") {
      if (value) {
        let phone =
          "(" +
          value.slice(0, 3) +
          ") " +
          value.slice(3, 6) +
          "-" +
          value.slice(6, 10);
        return phone;
      }
    }

    if (formatNumber == "min_num") {
      if (value) {
        let min =
          value.slice(0, 7) +
          "-" +
          value.slice(7, 17) +
          "-" +
          value.slice(17, 18);
        return min;
      }
    }

    if (formatNumber == "date") {
      value = this.datePipe.transform(value, "MM/dd/yyyy");
    }

    if (
      formatNumber == "percentage" ||
      formatNumber == "percentage2" ||
      formatNumber == "percentage3"
    ) {
      if (value != null && value != 0) {
        value = value + "%";
        return value;
      }
    }

    if (value == undefined || value == null) {
      value = "";
    }

    return value;
  }
}
