import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toCelsius'
})
export class CelsiusPipe implements PipeTransform{
    transform(value: number) : string {
        return (value - 273.15).toFixed(2) + '°C';
    }
}