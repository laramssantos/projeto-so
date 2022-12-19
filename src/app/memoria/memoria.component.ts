import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { interval, Subscription } from 'rxjs';
import { MemInfo } from '../interfaces/mem-info';
import { SystemInfo } from '../interfaces/system-info';
import { CommandsService } from '../services/commands.service';

@Component({
  selector: 'app-memoria',
  templateUrl: './memoria.component.html',
  styleUrls: ['./memoria.component.css']
})
export class MemoriaComponent {
  mem: MemInfo;
  top: SystemInfo;

  private updateSubscription: Subscription;

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'Total', 'Livre', 'Buffers', 'Cache', 'Swap Total', 'Swap Livre'],
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
  public pieChartLabels = [ 'Memória Livre', 'Memória Usada', 'Memória Buffers'];
  public pieChartDatasets = [ {
    data: [ 300, 500]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  ngOnInit() {
    this.updateSubscription = interval(9000).subscribe(
      (val) => { this.updateStatsBar()}
    );

    this.updateSubscription = interval(3000).subscribe(
      (val) => { this.updateStatsPie()}
    );
  }

  constructor(private comm: CommandsService){
    this.comm.getMemInfo().subscribe((data: MemInfo) => {
      this.mem = data;
      this.barChartData = {
        datasets: [
          { data: [this.mem.memoria_total/1000000, this.mem.memoria_livre/1000000, this.mem.memoria_buffers/1000000, this.mem.memoria_cache/1000000, this.mem.memoria_swap_total/1000000, this.mem.memoria_swap_livre/1000000], label: 'Memória (GB)' },
        ]
      };  
    });
    this.comm.getSystemInfo().subscribe((data: SystemInfo) => {
      this.top = data;
      this.pieChartDatasets = [ {
        data: [ this.top.memoria_livre, this.top.memoria_usada, this.top.memoria_buffers ]
      } ];
    });
  }

  updateStatsBar(){
    this.comm.getMemInfo().subscribe((data: MemInfo) => {
      this.mem = data;
      this.barChartData = {
        datasets: [
          { data: [this.mem.memoria_total/1000000, this.mem.memoria_livre/1000000, this.mem.memoria_buffers/1000000, this.mem.memoria_cache/1000000, this.mem.memoria_swap_total/1000000, this.mem.memoria_swap_livre/1000000], label: 'Memória (GB)' },
        ]
      };  
    });
  }

  updateStatsPie(){
    this.comm.getSystemInfo().subscribe((data: SystemInfo) => {
      this.top = data;
      this.pieChartDatasets = [ {
        data: [ this.top.memoria_livre, this.top.memoria_usada, this.top.memoria_buffers ]
      } ];
    });
  }
}
