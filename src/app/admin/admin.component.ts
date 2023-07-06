import {AfterViewInit, Component, OnInit} from '@angular/core';
  // import { EChartsOption } from 'echarts';
   import * as echarts from 'echarts';
import {HttpClient} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {environment} from "../../environments/environment";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',


})
export class AdminComponent implements AfterViewInit {
  constructor(private http: HttpClient) {}
  RendezVousCles: string[] = [];
  RendezVousValeurs: number[] = [];
  test: any[] = []
  PatientAgeCles: string[] = [];
  PatientAgeValeurs: number[] = [];
  MedecinSpecialiteCles: string[] = [];
  MedecinSpecialiteValeurs: number[] = [];
  PourcentagePatient: number[] = [];
  number: number = 5;
  array: any[] = [];
  a:number =this.RendezVousValeurs[1];
  renderChart() {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('mainchart')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      xAxis: {
        type: 'category',
        data: this.RendezVousCles
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.RendezVousValeurs,
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
        data: this.PatientAgeCles
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data:this.PatientAgeValeurs,
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
        data: this.MedecinSpecialiteCles,
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.MedecinSpecialiteValeurs,
          type: 'line'
        }
      ]
    };

    option3 && myChart3.setOption(option3);




  }
  getRendezVous(): Subscription {
    return this.http.get(`${environment.apiURL}/api/stats/rendezvous-par-date`).subscribe((data: any) => {
      console.log(data);

      this.RendezVousCles = Array.from(Object.keys(data));
      this.RendezVousValeurs = Array.from(Object.values(data))
      this.test=data;

      console.log(this.RendezVousCles);

      this.renderChart();


    });
  }
 getPatientParAge(): Subscription {
    return this.http.get(`${environment.apiURL}/api/stats/patients-par-age`).subscribe((data: any) => {
      console.log(data);

      this.PatientAgeCles = Object.keys(data);
      this.PatientAgeValeurs = Object.values(data);

      console.log(this.PatientAgeCles);
      console.log(this.PatientAgeValeurs);
      this.renderChart();


    });
  }
  getMedcinParSpecialite(): Subscription {
    return this.http.get(`${environment.apiURL}/api/stats/medecins-par-specialite`).subscribe((data: any) => {
      console.log(data);

      this.MedecinSpecialiteCles = Object.keys(data);
      this.MedecinSpecialiteValeurs = Object.values(data);

      console.log(this.MedecinSpecialiteCles);
      console.log(this.MedecinSpecialiteValeurs);
      this.renderChart();

    });

  }
  getPatientParAgeParPourcentage(): Subscription {
    return this.http.get(`${environment.apiURL}/api/stats/patients-par-age-poucentage`).subscribe((data: any) => {
      console.log(data);
      this.PourcentagePatient = Object.values(data);
      this.renderChart();


      // this.MedecinSpecialiteCles = Object.keys(data);
      // this.MedecinSpecialiteValeurs = Object.values(data);
      //
      // console.log(this.MedecinSpecialiteCles);
      // console.log(this.MedecinSpecialiteValewurs);
      // console.log(this.MedecinSpecialiteValeurs[1]);

    });
  }

  ngAfterViewInit() {
    this.getRendezVous();
    this.getMedcinParSpecialite();
    this.getPatientParAge();
    this.getPatientParAgeParPourcentage();

    let numberArray = this.RendezVousValeurs.map(Number);
    this.http.get(`${environment.apiURL}/api/stats/rendezvous-par-date`).subscribe((data: any) => {
      console.log(data);

      this.RendezVousCles = Array.from(Object.keys(data));
      this.RendezVousValeurs = Array.from(Object.values(data))
      this.test=data;

      console.log(this.RendezVousCles);
      console.log(this.RendezVousValeurs);
      console.log(this.test);

    });


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
          data: this.RendezVousValeurs,
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
