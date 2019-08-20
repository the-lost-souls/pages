import { Pipe, PipeTransform } from '@angular/core';

/**
 * Add a string suffix to any value, e.g. adding 'px' to a value in property bindings for styles.
 *
 * Adding suffix with a pure pipe is faster than simply adding suffixes directly in the html template as
 * change detection only looks at the input value.
 */
@Pipe({
  name: 'suffix'
})
export class SuffixPipe implements PipeTransform {

  transform(value: any, suffix: string): string {
    return `${value}${suffix}`;
  }
}
