import React,{Component} from 'react';
import axios from 'axios';
import Co2Record from './type/Co2Record'
import './Co2Chart.css';


class Co2Chart extends Component {
  data: Co2Record = new Co2Record();

  constructor(props:any) {
    super(props);
    
    this.reload();
  }

  reload =() => {
    let pro = this.getNowCo2RecordApi().then( ele => this.getNowCo2Record(ele));
    pro.then(() => this.setState(data => data = this.data ));
  }

  getNowCo2RecordApi = async () => {
    try {
      const result = await axios.get(`${"http://192.168.39.157/ktor/co2concentration/now"}`);
      return result.data;
    } catch (error) {
      console.log("error!!");
    }
  };

  getNowCo2Record = (ele: any) =>{
    for( let co2record of ele) {
      this.data = co2record;
    }
  };

  render(){
    return(
      <p>
        <div>
          取得時間：{this.data.createDatetime}
        </div>
        <div>
          CO2濃度：{this.data.co2Concentration}
        </div>
      </p>
    );
  }
}

export default Co2Chart;