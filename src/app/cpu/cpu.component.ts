import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { interval, Subscription } from 'rxjs';
import { CpuInfo } from '../interfaces/cpu-info';
import { SystemInfo } from '../interfaces/system-info';
import { CommandsService } from '../services/commands.service';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css']
})
export class CpuComponent {
  
  cpu: CpuInfo;
  top: SystemInfo;

  private updateSubscription: Subscription;

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'Usuário', 'Sistema', 'Inativo', 'Interrupções'],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55], label: 'Series A' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  ngOnInit() {
    this.updateSubscription = interval(3000).subscribe(
      (val) => { this.updateStatsBar()}
    );
  }

  constructor(private comm: CommandsService){
    this.comm.getCpuInfo().subscribe((data: CpuInfo) => {
      this.cpu = data;
    });
    this.comm.getSystemInfo().subscribe((data: SystemInfo) => {
      this.top = data;
      this.barChartData = {
        datasets: [
          { data: [this.top.pct_cpu_usuario, this.top.pct_cpu_sistema, this.top.pct_cpu_inativo, this.top.pct_cpu_si], label: 'CPU (%)' },
        ]
      }; 
    });
  }

  updateStatsBar(){
    this.comm.getSystemInfo().subscribe((data: SystemInfo) => {
      this.top = data;
      this.barChartData = {
        datasets: [
          { data: [this.top.pct_cpu_usuario, this.top.pct_cpu_sistema, this.top.pct_cpu_inativo, this.top.pct_cpu_si], label: 'CPU (%)' },
        ]
      }; 
    });
  }

}
