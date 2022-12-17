import { Component } from '@angular/core';
import { CpuInfo } from '../interfaces/cpu-info';
import { CommandsService } from '../services/commands.service';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css']
})
export class CpuComponent {
  
  cpu: CpuInfo;

  constructor(private comm: CommandsService){
    this.comm.getCpuInfo().subscribe((data: CpuInfo) => {
      this.cpu = data;
      console.log(this.cpu)
    });
  }

}
