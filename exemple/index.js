const HandledFunction = require('../index');

{
  const schema = {
    0: [
      {
        type: 'array',
        items: {
          type: 'string',
          empty: false,
          convert: true
        }
      },
      {
        type: 'string',
        empty: false,
        convert: true
      }
    ],
    1: {
      type: 'number',
      integer: true,
      positive: true,
      default: 1,
      convert: true
    },
    2: {
      type: 'string',
      enum: ['s', 'q', 't', 'm', 'n', 'w', 'z', 'c', 'b'],
      default: 'w'
    },
    3: {
      type: 'string',
      empty: false,
      convert: true,
      optional: true,
      default: 'elvis'
    },
    7: {
      type: 'array',
      default: ['jack', 'chan']
    }
  };

  function test (a, b, c, d, e, f, g, h) {
    console.log(arguments);
  }

  const handledTest = new HandledFunction(test, schema);
  handledTest('a');
}

{
  const schema = [
    {
      type: 'array',
      items: {
        type: 'string',
        empty: false,
        convert: true
      }
    },
    {
      type: 'string',
      empty: false,
      convert: true
    },
    {
      type: 'number',
      empty: false,
      convert: true
    }
  ];

  function test (a, b, c, d, e, f, g, h) {
    console.log(arguments);
  }

  const handledTest = new HandledFunction(test, schema);

  handledTest(['aa'], 1, '10', 'bla', true);

  /** result =>
   * [Arguments] {
   *  '0': [ 'aa' ],
   *  '1': '1',
   *  '2': 10,
   *  '3': 'bla',
   *  '4': true,
   *  '5': undefined,
   *  '6': undefined,
   *  '7': undefined
   * }
   */
}
