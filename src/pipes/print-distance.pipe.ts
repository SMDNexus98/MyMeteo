import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'printDistance'
})
export class PrintDistance implements PipeTransform {
    transform(value: number) : string {
        if (value > 1000)
            return (value * 0.001).toFixed(2) + "km";
        else
            return value.toFixed(2) + "m"; 
    }
}