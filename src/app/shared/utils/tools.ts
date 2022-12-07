export function serialize(obj = {}) {
  const arr = [];
  for (const k of Object.keys(obj)) {
    arr.push(
      `${k}=${encodeURIComponent(
        typeof obj[k] === "string" ? String.prototype.trim.call(obj[k]) : obj[k] === null ? "" : obj[k]
      )}`
    );
  }
  return arr.join("&");
}

export function delEmptyKey(obj: any) {
  const copy = {};
  if (obj === null || obj === undefined || obj === "") {
    return copy;
  }
  for (const key in obj) {
    if (obj[key] !== null && typeof obj[key] === "object") {
      copy[key] = this.delEmptyKey(obj[key]);
    } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
      copy[key] = obj[key];
    }
  }
  return copy;
}

export function isEmptyObject(obj: any) {
  let name: any;
  for (name in obj) {
    return false;
  }
  return true;
}

export function randint(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isValidDate(date: Date) {
  return date instanceof Date && !isNaN(date.getTime());
}

export function obj2Str(obj: any) {
  const p = {};
  for (const key of Object.keys(obj)) {
    if (obj[key] || obj[key] === 0) {
      if (obj[key].toString() !== "") {
        p[key] = obj[key].toString();
      }
    }
  }
  return p;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function str2arr(str: string) {
  return str.replace(/[\r\n\s]/g, "").split(",");
}

export function getScrollbarWidth() {
  const scrollDiv = document.createElement("div");
  scrollDiv.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;";
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);

  return scrollbarWidth;
}

export function paint(json: any) {
  if (typeof json !== "string") {
    json = JSON.stringify(json, undefined, 2);
  }
  // if (environment.verbose) console.log(json);
  const style =
    "<style>.string {color: #285;} .number {color: #25d;} .boolean {color: #f84;} .null {color: #555;} .key {color: #c36;}</style>";
  json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // tslint:disable-next-line: max-line-length
  json =
    style +
    json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match) => {
        let cls = "number";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "key";
          } else {
            cls = "string";
          }
        } else if (/true|false/.test(match)) {
          cls = "boolean";
        } else if (/null/.test(match)) {
          cls = "null";
        }
        return '<span class="' + cls + '">' + match + "</span>";
      }
    );
  return json;
}

export function json(data: any, indent: number = 2) {
  console.log(JSON.stringify(data, null, indent))
}