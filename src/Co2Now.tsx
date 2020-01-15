import React,{Component} from 'react';
import axios from 'axios';
import Co2Record from './type/Co2Record'
import './Co2Chart.css';

interface State {
  data:Co2Record;
}

interface JsonCo2Data {
  createDatetime:String;
  co2Concentration:Number
}

class Co2Chart extends Component<{},State> {
  state: State = {
    data:new Co2Record(),
  }
  constructor(props:{}) {
    super(props);
    this.setState({});
  }

  componentDidMount =() =>{
    this.reload();
  }

  reload =() => {
    this.getNowCo2RecordApi().then( ele => this.getNowCo2Record(ele));
  }

  getNowCo2RecordApi = async () => {
    try {
      const result = await axios.get("http://192.168.39.157/ktor/co2concentration/now");
      return result.data;
    } catch (error) {
      console.log("error!!");
    }
  };

  getNowCo2Record = ( ele:JsonCo2Data[] ) =>{
    for( let co2record of ele) {
      let data = new Co2Record(co2record.createDatetime,co2record.co2Concentration);
      this.setState({data:data});
    }
  };

  render(){
    return(
      <div>
        <div>
          取得時間：{this.state.data.createDatetime}
        </div>
        <div>
          CO2濃度：{this.state.data.co2Concentration}
        </div>
      </div>
    );
  }
}

export default Co2Chart;