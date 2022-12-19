import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FunctionsUsingCSI, NgTerminal } from 'ng-terminal';
import { Subject } from 'rxjs';
import { CommandsService } from '../services/commands.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent {
  comando = new FormControl('');

  readonly title = 'NgTerminal Live Example';
  readonly color = 'accent';
  readonly prompt = '\n' + FunctionsUsingCSI.cursorColumn(1) + '$ ';

  _draggable: boolean = undefined;
  
  public draggableMode: boolean;
  public apiMode: boolean;
  public fixed = false;

  disabled = false;
  rowsControl = new FormControl();
  colsControl = new FormControl();
  inputControl = new FormControl();

  underlying: NgTerminal;

  @ViewChild('term', {static: false}) child: NgTerminal;

  constructor(private comm: CommandsService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.debug("example: font apply" );
    this.child.setXtermOptions({
      fontFamily: '"Cascadia Code", Menlo, monospace',
      cursorBlink: true
    });
    this.child.write(this.prompt);
    this.child.onData().subscribe((input) => {
      if (input === '\r') { // Carriage Return (When Enter is pressed)
        this.child.write(this.prompt);
      } else if (input === '\u007f') { // Delete (When Backspace is pressed)
        if (this.child.underlying.buffer.active.cursorX > 2) {
          this.child.write('\b \b');
        }
      } else if (input === '\u0003') { // End of Text (When Ctrl and C are pressed)
          this.child.write('^C');
          this.child.write(this.prompt);
      }else{
        this.child.write(input);
      }
    })

    this.child.onKey().subscribe(e => {
      //onData() is used more often.
    });
  }

  writeSubject = new Subject<string>();
  write() {
    this.writeSubject.next(eval(`'${this.inputControl.value}'`));
  }

  keyInput: string;
  onKeyInput(event: string) {
    this.keyInput = event;
   
  }

  enviarComando(){
    this.comm.getCommand(this.comando.value).subscribe((out:{comando:string, retorno: string}) =>{
      this.comando.setValue('');
      this.child.write(out.comando);
      this.child.write('\n' + FunctionsUsingCSI.cursorColumn(1));
      this.child.write(out.retorno);
      this.child.write(this.prompt);
      
    });
  }
  
}
