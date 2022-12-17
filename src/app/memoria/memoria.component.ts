import { Component } from '@angular/core';
import { MemInfo } from '../interfaces/mem-info';
import { CommandsService } from '../services/commands.service';

@Component({
  selector: 'app-memoria',
  templateUrl: './memoria.component.html',
  styleUrls: ['./memoria.component.css']
})
export class MemoriaComponent {
  mem: MemInfo;

  constructor(private comm: CommandsService){
    this.comm.getMemInfo().subscribe((data: MemInfo) => {
      this.mem = data;
      console.log(this.mem)
    });
  }
}
