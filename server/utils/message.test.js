const expect = require('expect');

const { generateMessage } = require('./message');

describe('Generate Message', () => {
  it('should generate the correct message object.', () => {
    let from = 'William';
    let text = 'Hello!';
    let message = generateMessage(from, text);

    expect(message).toInclude({from, text});
    expect(typeof message.createdAt).toBe('number');
  });
});
