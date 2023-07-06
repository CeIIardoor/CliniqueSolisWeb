import {Component, OnInit} from '@angular/core';
  // import { EChartsOption } from 'echarts';
   import * as echarts from 'echarts';
import {HttpClient} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {environment} from "../../environments/environment";



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',


})
export class AdminComponent implements OnInit {
  constructor(private http: HttpClient) {}
  mesCles: string[] = [];
  mesValeurs: string[] = [];
  number: number = 5;
  getAllPatients(): Subscription {
    return this.http.get(`${environment.apiURL}/api/stats/rendezvous-par-date`).subscribe((data: any) => {
      console.log(data);

      this.mesCles = Object.keys(data);
      this.mesValeurs = Object.values(data);

      console.log(this.mesCles);
      console.log(this.mesValeurs);
      console.log(this.mesValeurs[1]);

    });
  }

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
          data: [this.mesValeurs[1], this.number, this.number, this.number, this.number, this.number, this.number],
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
          data:[1, 1, 1, 1, 1, 1, 1] ,
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


    this.getAllPatients();
  }


}
