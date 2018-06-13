const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('Generate Message', () => {
  it('should generate the correct message object.', () => {
    let from = 'William';
    let text = 'Hello!';
    let message = generateMessage(from, text);

    expect(message).toInclude({from, text});
    expect(typeof message.createdAt).toBe('number');
  });
});


describe('generateLocationMessage', () => {
  it('should generate correct location object.', () => {
    let from = 'William';
    let url = `https://www.google.com/maps?q=1,2`;
    let message = generateLocationMessage(from, 1, 2);

    expect(message).toInclude({from, url});
    expect(typeof message.createdAt).toBe('number');
    expect(message.url).toBe(url);
    });
});
