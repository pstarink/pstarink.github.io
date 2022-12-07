import { Validators } from "@angular/forms";

export class Check {
  static Text = (max: number, required = true) => [
    required ? Validators.required : Validators.nullValidator,
    Validators.minLength(2),
    Validators.maxLength(max),
  ];

  static Min = (min: number, required = true) => [
    required ? Validators.required : Validators.nullValidator,
    Validators.min(min),
  ];

  static _regex = new RegExp("");
  static Password = (required = true) => [
    required ? Validators.required : Validators.nullValidator,
    Validators.minLength(8),
    Validators.maxLength(200),
    Validators.pattern(Check._regex),
  ];

  static Range = (min: number, max: number, required = true) => [
    required ? Validators.required : Validators.nullValidator,
    Validators.min(min),
    Validators.max(max),
  ];
}
