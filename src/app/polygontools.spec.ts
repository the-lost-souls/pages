import { TestBed } from '@angular/core/testing';

import * as p from 'polygon-tools';

// no idea why this line is necessary
const polygonTools: any = p;

// just a few sanity checks to make sure the handmade typings file works.
describe('PolygonTools', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('test area', () => {

    // given
    const polygon = [[0, 0], [1, 1], [0, 1]];

    // then
    expect(polygonTools.polygon.area(polygon, null)).toEqual(0.5);
  });

  it('test subtract', () => {

    // given
    const rectangle1 = [[0, 0], [2, 0], [2, 2], [0, 2]];
    const rectangle2 = [[1, 1], [3, 1], [3, 3], [1, 3]];

    // then
    const actual = polygonTools.polygon.subtract(rectangle1, rectangle2);
    const expected = [[0, 2], [0, 0], [2, 0], [2, 1], [1, 1], [1, 2]];
    expect(actual).toEqual([expected]);
    expect(polygonTools.polygon.area(actual[0])).toEqual(3);
  });
});
