export const enum LabelTemplate {
  Unknown = 0,
  Tube,
  Plate,
}

export enum LabelPrinter {
  Printed = 0,
  Reprint = 1,
  Fail = 2,
  Success = 3,
}

export enum PrinterType {
  Unknown = 0,
  Zebra200 = 2,
  Zebra300 = 3,
  Zebra600 = 6,
}

export enum FieldType {
  None = 0,
  Text,
  Barcode39,
  Barcode128,
}
