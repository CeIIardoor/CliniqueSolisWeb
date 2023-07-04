import {Component, OnInit} from '@angular/core';
  // import { EChartsOption } from 'echarts';
   import * as echarts from 'echarts';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',


})
export class AdminComponent implements OnInit {
  ngOnInit() {

      type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('mainchart')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };

    option && myChart.setOption(option);
    var chartDom2 = document.getElementById('mainchart2')!;
    var myChart2 = echarts.init(chartDom2);
    var option2: EChartsOption;

    option2 = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        }
      ]
    };

    option2 && myChart2.setOption(option2);
    var chartDom3 = document.getElementById('mainchart3')!;
    var myChart3 = echarts.init(chartDom3);
    var option3: EChartsOption;

    option3 = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };

    option3 && myChart3.setOption(option3);


  }


}
