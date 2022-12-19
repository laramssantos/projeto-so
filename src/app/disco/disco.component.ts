import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { interval, Subscription } from 'rxjs';
import { DiskInfo } from '../interfaces/disk-info';
import { CommandsService } from '../services/commands.service';

@Component({
  selector: 'app-disco',
  templateUrl: './disco.component.html',
  styleUrls: ['./disco.component.css']
})
export class DiscoComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  disks: DiskInfo[] = [];
  private updateSubscription: Subscription;

  title = 'ng2-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Espaço Disponível', 'Espaço Usado'],
    datasets: [],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  constructor(private comm: CommandsService){     
    this.comm.getDiskInfo().subscribe((data: DiskInfo[]) => {
      this.disks = data;
      this.disks.forEach(disk => {
        if(disk.espaco_disponivel != 0 && disk.espaco_usado != 0)
          this.barChartData.datasets.push({ data: [disk.espaco_disponivel, disk.espaco_usado], label: disk.origem_disco.toString()});  
      })
      
      this.chart.update();
    });
  }
}
