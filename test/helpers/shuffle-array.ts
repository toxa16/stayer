import * as assert from 'assert';

/**
 * Shuffles array.
 * @param {Array} a The array containing the elements.
 * @return new array containing shuffled elements.
 */
export function shuffleArray(a: any[]): any[] {
  const b = [];
  for (let i = 0; i < a.length; i++) {
    b[i] = a[i];
  }
  for (let i = b.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [b[i - 1], b[j]] = [b[j], b[i - 1]];

  }
  return b;
}


/*describe('shuffleArray()', () => {
  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const actualArray = shuffleArray(testArray);

  it(`should return an array of ${testArray.length} elements`, () => {
    const actual = actualArray.length;
    const expected = testArray.length;
    assert.equal(actual, expected);
  });

  for (const element of testArray) {
    it (`should return an array with element '${element}'`, () => {
      assert.ok(actualArray.indexOf(element) !== -1);
    });
  }
});*/
