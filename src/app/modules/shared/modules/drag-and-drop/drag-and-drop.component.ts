import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {DropBoxOnChangeInterface} from "./interfaces/drop-box.interface";

@Component({
  selector: 'yrx-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent {
  @ViewChild('fileLoader') fileLoader!: ElementRef;
  @Input() loading: boolean = false;
  @Input() accept: string[] = []
  @Input() fullHeight: boolean = false
  @Input() icon: string = ''
  @Input() iconStroked: boolean = false
  @Output() onChange: EventEmitter<DropBoxOnChangeInterface> = new EventEmitter<DropBoxOnChangeInterface>()

  constructor() { }

  ngAfterViewInit() {
  }

  public onChangeFile() {
    const files: File[] = Array.from(this.fileLoader.nativeElement.files);
    this.formatFiles(files);
  }

  public openFileManager() {
    if (!this.loading) {
      this.fileLoader.nativeElement.click()
      this.fileLoader.nativeElement.value = ""
    }
  }

  private formatFiles(files: File[]) {
    files.forEach((file: File) => {
      if (!this.accept.includes(file.type)) return
      const reader = new FileReader();
      reader.onload  = () => {
        this.onChange.emit({file, url: reader.result})
      }
      reader.readAsDataURL(file);
    })
  }

  onDrop(data: {files: File[]}) {
    if (!this.loading) {
      this.formatFiles(data.files);
    }
  }
}
