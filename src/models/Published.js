class Published {
  constructor() {
    this.time = new Date(Date.now());
    this.day = this.time.getDate().toString();
    this.month = (this.time.getMonth() + 1).toString();
    this.convertedMonth = (`0${this.month}`).slice(- 2);
    this.year = this.time.getFullYear().toString().slice(2);
  }

  fullDate() {
    return `${this.day}/${this.convertedMonth}/${this.year}`;
  }
}

export default Published;
