const expect = require('expect');

const {isRealString} = require('./validators');


describe('isRealString', () => {
  const whiteSpace = isRealString("      ");
  const number = isRealString(9);
  const validString = isRealString('    Developers  ');
  it('should reject non string values', () => {
    expect(whiteSpace).toBeFalsy();
  });

  it('should reject strings with only spaces.', () => {
    expect(number).toBeFalsy();
  });
  it('should allow strings with non space characters', () => {
    expect(validString).toBeTruthy();
  });
});
