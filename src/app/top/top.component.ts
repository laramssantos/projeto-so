import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ProcessInfo } from '../interfaces/process-info';
import { SystemInfo } from '../interfaces/system-info';
import { CommandsService } from '../services/commands.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent {
  top: SystemInfo;
  processos: ProcessInfo[] = [];
  private updateSubscription: Subscription;

  ngOnInit() {
      this.updateSubscription = interval(3000).subscribe(
        (val) => { this.updateStats()}
      );
  }

  constructor(private comm: CommandsService){
    this.comm.getSystemInfo().subscribe((data: SystemInfo) => {
      this.top = data;
      this.processos = data.processos;
      console.log(this.top)
    });
  }

  updateStats(){
    this.comm.getSystemInfo().subscribe((data: SystemInfo) => {
      this.top = data;
      this.processos = data.processos;
    });
  }

}
