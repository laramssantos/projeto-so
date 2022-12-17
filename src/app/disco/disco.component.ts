import { Component } from '@angular/core';
import { DiskInfo } from '../interfaces/disk-info';
import { CommandsService } from '../services/commands.service';

@Component({
  selector: 'app-disco',
  templateUrl: './disco.component.html',
  styleUrls: ['./disco.component.css']
})
export class DiscoComponent {
  disk: DiskInfo;

  constructor(private comm: CommandsService){
    this.comm.getDiskInfo().subscribe((data: DiskInfo) => {
      this.disk = data;
      console.log(this.disk)
    });
  }
}
