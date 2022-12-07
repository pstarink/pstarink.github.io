import { LabelTemplate, PrinterType, FieldType } from "./enums";
import * as dayjs from "dayjs";

export class BarcodeLabel {
  public fields: LabelField[] = [];
  public name: string;
  public type: PrinterType;
  public resolution = 300;
  public dx = 0;
  public dy = 0;
  public fw = 0;

  constructor(template: LabelTemplate, bc: string, title: string, data: string[]) {
    if (template == LabelTemplate.Tube) {
      this.addBarcode128(data[0], 65, 65, 180); // barcode
      this.addText(title ?? template.toString(), 825, 200, 90); // title
      for (let i = 0; i < data.length; i++) {
        this.addText(data[i], 700 - i * 125, 200, 90)
      }
      const now = dayjs().format("YYYY/MM/DD HH:mm")
      this.addText(now, 75, 200, 90); // time stamp
    } else if (template == LabelTemplate.Plate) {
      if (data.length == 0) {
        throw new Error("Plate Label: barcode required");
      }
      this.addText(title, 100, 310, 270);
      this.addBarcode128(data[0], 95, 40, 270);
      if (data.length > 1) this.addText(data[1], 40, 310, 270);
    }
  }

  //
  // AddBarcodeField
  //
  public addBarcode39(text: string, x: number, y: number, rotation: number) {
    this.fields.push(new LabelField(FieldType.Barcode39, text, x, y, rotation));
  }

  public addBarcode128(text: string, x: number, y: number, rotation: number) {
    this.fields.push(new LabelField(FieldType.Barcode128, text, x, y, rotation));
  }

  //
  // AddText
  //
  public addText(text: string, x: number, y: number, rotation: number) {
    this.fields.push(new LabelField(FieldType.Text, text, x, y, rotation));
  }

  //
  // Print
  //
  public printLabel(print: PrinterType) {
    // print label to printer using qz or BrowserPrint component
    const zpl = this.getZPLCode();
    console.log(zpl);
  }

  getZPLCode(): string {
    // start label definition
    let zplCode = "^XA";

    // add label or printer codes

    // * add label offset
    zplCode += `^LH${scale(this.resolution, this.dx, this.dy)}`;
    // * define default barcode
    zplCode += `^BY3,,100`;
    // * set the font weight
    zplCode += `~SD${this.fw}`;

    // add the fields
    this.fields.forEach((field) => (zplCode += field.getZPLCode(this.resolution)));

    // finish the label
    zplCode += `^XZ`;
    return zplCode;
  }
}

export class LabelField {
  dir = {
    0: "N",
    90: "R",
    180: "I",
    270: "B",
  };
  fieldType: FieldType;
  x: number;
  y: number;
  ht: number;
  wd: number;
  text: string;
  font = "0";

  rotation = 0;

  constructor(fieldType: FieldType, text: string, x: number, y: number, rotation: number) {
    this.fieldType = fieldType;
    this.text = text;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
  }

  //
  // GetZPLCode
  //
  getZPLCode(r: number): string {
    const orientation = this.dir[this.rotation];
    const ht = scale(r, this.ht ?? 80);

    let ZPLCode = "^FO" + scale(r, this.x, this.y);
    if (this.fieldType == FieldType.Text) {
      ZPLCode += "^A" + this.font + orientation + "," + ht;
    } else if (this.fieldType == FieldType.Barcode39) {
      ZPLCode += "^B3" + orientation + ",N," + ht + ",Y,N";
    } else if (this.fieldType == FieldType.Barcode128) {
      ZPLCode += "^BC" + orientation + "," + ht + ",Y,N,N";
    }
    ZPLCode += `^FD${this.text}^FS`;
    return ZPLCode;
  }
}

function scale(r: number, x: number, y = -1) {
  const sx = ((x * r) / 1000).toFixed(0);
  if (y < 0) {
    return sx;
  }
  const sy = ((y * r) / 1000).toFixed(0);
  return `${sx},${sy}`;
}

// Getting started with ZPL: http://labelary.com/zpl.html
