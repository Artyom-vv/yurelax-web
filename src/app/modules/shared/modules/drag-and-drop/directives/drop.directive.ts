import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appDrop]'
})
export class DropDirective {

  @HostBinding('class.dragging') private fileOver: boolean = false;
  @Output() fileDropped: EventEmitter<{files: File[]}> = new EventEmitter<{files: File[]}>()

  constructor() {
  }

  @HostListener('dragover', ['$event'])
  private onDragOver(event: any) {
    event.preventDefault()
    event.stopPropagation()
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event'])
  private onDragLeave(event: any) {
    event.preventDefault()
    event.stopPropagation()
    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  private onDrop(event: any) {
    event.preventDefault()
    event.stopPropagation()
    this.fileOver = false;
    if (event.dataTransfer) {
      const files: File[] = Array.from(event.dataTransfer.files)
      if (files.length > 0) {
        this.fileDropped.emit({files});
      }
    }
  }
}
