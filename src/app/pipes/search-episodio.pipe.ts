import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchEpisodio'
})
export class SearchEpisodioPipe implements PipeTransform {

  transform(arreglo: any[],texto: string): any[] {
    if(texto === ''){
      return arreglo
    } 
    return  arreglo.filter(item =>{
      return item.nombre.toLocaleLowerCase().includes(texto.toLocaleLowerCase());
    });
  }

}
