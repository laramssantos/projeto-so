import { Component } from '@angular/core';
import { SystemInfo } from '../interfaces/system-info';
import { CommandsService } from '../services/commands.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent {
  top: SystemInfo;

  constructor(private comm: CommandsService){
    this.comm.getSystemInfo().subscribe((data: SystemInfo) => {
      this.top = data;
      console.log(this.top)
    });
  }
}
