import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHipodromo'
})
export class SearchHipodromoPipe implements PipeTransform {

  transform(arreglo: any[],texto: string): any[] {
    if(texto === ''){
      return arreglo
    } 
    return  arreglo.filter(item =>{
      return item.nombre.toLocaleLowerCase().includes(texto.toLocaleLowerCase());
    });
  }

}
