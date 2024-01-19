class Log {
  static str;
  constructor(str) {
    this.str = str;
  }
  log() {
    console.log("log:this.str", this.str);
  }
  warn() {
    console.warn("warn:this.str", this.str);
  }
  error() {
    console.error("error:this.str", this.str);
  }
}

class L extends Log {
  constructor(str) {
    super(str);
  }
  log() {
    console.log("=====>", this.str);
  }
}

export { Log, L };
