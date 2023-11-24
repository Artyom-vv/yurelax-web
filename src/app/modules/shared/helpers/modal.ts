import {MatDialogConfig} from "@angular/material/dialog";

export const modalConfig = <T = any>(config: MatDialogConfig<T>): MatDialogConfig<T> => {
  let panelClasses: string[] = ['yrx-modal'];

  if (typeof config.panelClass === 'string') {
    // Если panelClass - строка, разделяем ее на массив
    panelClasses = panelClasses.concat(config.panelClass.split(' '));
  } else if (Array.isArray(config.panelClass)) {
    // Если panelClass уже массив, добавляем его элементы
    panelClasses = panelClasses.concat(config.panelClass);
  }

  return {
    ...config,
    panelClass: panelClasses
  };
};
