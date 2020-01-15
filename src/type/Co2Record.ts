class Co2Record {
  createDatetime: String;
  co2Concentration: Number;

  constructor(createDatetime: String = "",co2Concentration: Number = 0){
    this.createDatetime = createDatetime;
    this.co2Concentration = co2Concentration;
  }
};
export default Co2Record;