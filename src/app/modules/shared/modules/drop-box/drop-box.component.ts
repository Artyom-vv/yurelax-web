import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {DropBoxOnChangeInterface} from "./drop-box.interface";

@Component({
  selector: 'yrx-drop-box',
  templateUrl: './drop-box.component.html',
  styleUrls: ['./drop-box.component.scss']
})
export class DropBoxComponent implements AfterViewInit, OnChanges {

  @ViewChild('fileLoader') fileLoader!: ElementRef;
  @Input() title: string = '';
  @Input() existFile?: BehaviorSubject<File | null>;
  @Input() row: boolean = false;
  @Input() disabled: boolean = false;
  @Output() onChange: EventEmitter<DropBoxOnChangeInterface> = new EventEmitter<DropBoxOnChangeInterface>()

  public mounted: boolean = false;

  public img: {
    type: string,
    total: string,
    url: string | ArrayBuffer | null
  } | null = null

  constructor() { }

  ngAfterViewInit() {
    this.mounted = true;
    this.existFile?.subscribe((file) => {
      console.log(file)
      if (file) {
        this.formatFiles([file], true)
      } else {
        this.onRemove();
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.mounted) {
      if (changes["disabled"]?.currentValue) {
        this.onRemove()
      }
    }
  }

  public onChangeFile() {
    const files: File[] = Array.from(this.fileLoader.nativeElement.files);
    this.formatFiles(files, false);
  }

  public openFileManager() {
    if (!this.disabled) {
      this.fileLoader.nativeElement.click()
      this.fileLoader.nativeElement.value = ""
    }
  }

  private formatFiles(files: File[], isInit: boolean = true) {
    const types = ["image/png","image/jpg","image/jpeg"]
    files.forEach((file: File) => {
      if (!types.includes(file.type)) {
        return
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const type = file.type.split('/')[1]
        this.img= {
          type,
          total: this.formatBytes(file.size),
          url: e!.target!.result
        }
      }
      this.onChange.emit({file, isInit})
      reader.readAsDataURL(file);
    })
  }

  formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0b'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['b', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  onRemove() {
    this.onChange.emit({file: false, isInit: false})
    this.img = null
    this.fileLoader.nativeElement.value = ""
  }

  onDrop(data: {files: File[]}) {
    if (!this.disabled) {
      this.formatFiles(data.files, false);
    }
  }
}
