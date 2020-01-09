import React,{Component} from 'react';
import axios from 'axios';
import './Co2Chart.css';
import {Line} from 'react-chartjs-2';
import Co2Record from './type/Co2Record'


class Co2Chart extends Component {
  data: any;

  constructor(props:any) {
    super(props);
    
    this.data = {};
    this.reload();
  }

  reload =() => {
    let pro = this.getCo2RecordApi().then( ele => this.getCo2Record(ele));
    pro.then(() => this.setState(data => data = this.data ));
  }

  getCo2RecordApi = async () => {
    try {
      const result = await axios.get(`${"http://192.168.39.157/ktor/co2concentration/day"}`);
      return result.data;
    } catch (error) {
      console.log("error!!");
    }
  
  };

  getCo2Record = (ele: Co2Record[]) =>{
    let datetime: any[] = [];
    let co2: any[] = [];

    for( let co2record of ele) {
      datetime.push( co2record.createDatetime );
      co2.push( co2record.co2Concentration );
    }
      
    this.data = {
      labels: datetime,
      datasets: [
        {
          label: 'CO2濃度',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'round',
          borderDashOffset: 0.0,
          borderJoinStyle: 'square',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#eee',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 1,
          pointRadius: 1,
          pointHitRadius: 10,
          data: co2
        }
      ]
    };
  };

  render(){
    return(
      <p>
        <Line data={this.data}　/>
      </p>
    );
  }

}

export default Co2Chart;