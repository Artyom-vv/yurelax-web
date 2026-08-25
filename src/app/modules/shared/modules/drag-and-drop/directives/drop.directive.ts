import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
    selector: '[appDrop]',
    standalone: false
})
export class DropDirective {

  @HostBinding('class.dragging') fileOver: boolean = false;
  @Output() fileDropped: EventEmitter<{files: File[]}> = new EventEmitter<{files: File[]}>()

  constructor() {
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
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
