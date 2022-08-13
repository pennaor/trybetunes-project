// Exercise done by pennaor as JavaScript classes study
// It's suppose to receive a string in the format: 2008-06-02T07:00:00Z
// Expected return date in the format: 02/06/2008

export default class DateFormater {
  constructor(date) {
    this.date = [date];
  }

  lengthOf = {
    DATE_UNITS: 3,
    DAY: 2,
    MONDAY: 2,
    YEAR: 4,
  }

  spliter(character, resultLen) {
    this.date = this.date[0].split(character);
    return this.date.length === resultLen;
  }

  switcher() {
    const [year, month, day] = this.date;
    this.date = [day, month, year];
    return (
      this.date[0].length === this.lengthOf.DAY
      && this.date[1].length === this.lengthOf.MONDAY
      && this.date[2].length === this.lengthOf.YEAR
    );
  }

  format() {
    if (
      typeof this.date[0] === 'string'
      && this.spliter('T', 2)
      && this.spliter('-', this.lengthOf.DATE_UNITS)
      && this.switcher()
    ) {
      return this.date.join('/');
    }

    return 'Invalid date';
  }
}
