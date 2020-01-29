import React,{Component} from 'react';
import axios from 'axios';
import './Co2Chart.css';
import {Line} from 'react-chartjs-2';
import Co2Record from './Co2Record'
import { ChartData, ChartDataSets } from 'chart.js';


class Co2Chart extends Component<{},ChartData> {

  constructor(props:{}) {
    super(props);
    this.setState({});
  }

  componentDidMount() {
    this.reload();
  }

  //グラフ表示のメソッド
  private async reload() {
    let chartData :ChartData = this.getCo2Record(await this.getCo2RecordApi());
    this.setState(chartData);
  }

  private async getCo2RecordApi() {
    try {
      const result = await axios.get("http://192.168.39.156/ktor/co2concentration/day");
      return result.data;
    } catch (error) {
      console.log("error!!");
    }
  };

  private getCo2Record(ele: Co2Record[]) {
    let datetime: string[] = [];
    let co2: number[] = [];

    for( let co2record of ele) {
      datetime.push( co2record.createDatetime );
      co2.push( co2record.co2Concentration );
    }

    //CO2濃度のグラフデータセット
    let co2Dataset:ChartDataSets = {
      label: 'CO2濃度',
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      pointHoverBorderWidth: 1,
      pointRadius: 1,
      data: co2
    }

    let data:ChartData = {
      labels: datetime,
      datasets: [co2Dataset]
    };

    return data;
  };

  render(){
    return(
      <p>
        <Line data={this.state}/>
      </p>
    );
  }
}

export default Co2Chart;