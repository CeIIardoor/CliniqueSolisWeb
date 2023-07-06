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
  RendezVousCles: string[] = [];
  RendezVousValeurs: number[] = [];
  PatientAgeCles: string[] = [];
  PatientAgeValeurs: number[] = [];
  MedecinSpecialiteCles: string[] = [];
  MedecinSpecialiteValeurs: number[] = [];
  number: number = 5;
  array: any[] = [1,2,4,6,7,8,9,10];
  getRendezVous(): Subscription {
    return this.http.get(`${environment.apiURL}/api/stats/rendezvous-par-date`).subscribe((data: any) => {
      console.log(data);

      this.RendezVousCles = Object.keys(data);
      this.RendezVousValeurs = Object.values(data);

      console.log(this.RendezVousCles);
      console.log(this.RendezVousValeurs);
      console.log(this.RendezVousValeurs[1]);

    });
  }
 getPatientParAge(): Subscription {
    return this.http.get(`${environment.apiURL}/api/stats/patients-par-age`).subscribe((data: any) => {
      console.log(data);

      this.PatientAgeCles = Object.keys(data);
      this.PatientAgeValeurs = Object.values(data);

      console.log(this.PatientAgeCles);
      console.log(this.PatientAgeValeurs);
      console.log(this.PatientAgeValeurs[1]);

    });
  }
  getMedcinParSpecialite(): Subscription {
    return this.http.get(`${environment.apiURL}/api/stats/medecins-par-specialite`).subscribe((data: any) => {
      console.log(data);

      this.MedecinSpecialiteCles = Object.keys(data);
      this.MedecinSpecialiteValeurs = Object.values(data);

      console.log(this.MedecinSpecialiteCles);
      console.log(this.MedecinSpecialiteValeurs);
      console.log(this.MedecinSpecialiteValeurs[1]);

    });
  }

  ngOnInit() {
    this.getRendezVous();
    this.getMedcinParSpecialite();
    this.getPatientParAge();


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
          data: [this.MedecinSpecialiteValeurs[1], this.array[3], this.number, this.number, this.number, this.number, this.number],
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



  }


}
