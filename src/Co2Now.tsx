import React,{Component} from 'react';
import axios from 'axios';
import Co2Record from './Co2Record'
import './Co2Chart.css';

interface State {
  data:Co2Record;
}

interface JsonCo2Data {
  createDatetime:string;
  co2Concentration:number
}

class Co2Chart extends Component<{},State> {
  state: State = {
    data:new Co2Record(),
  }
  constructor(props:{}) {
    super(props);
    this.setState({});
  }

  componentDidMount() {
    this.reload();
  }

  private async reload() {
    this.getNowCo2Record( await this.getNowCo2RecordApi() );
  }

  private async getNowCo2RecordApi() {
    try {
      const result = await axios.get("http://192.168.39.157/ktor/co2concentration/now");
      return result.data;
    } catch (error) {
      console.log("error!!");
    }
  };

  private getNowCo2Record( ele:JsonCo2Data[] ) {
    let co2Record = new Co2Record(ele[0].createDatetime, ele[0].co2Concentration);
    this.setState({data:co2Record});
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