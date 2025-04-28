const dummyData = [
  {
    phoneNumber: 9876543210,
    createdAt: '2023-01-01T10:00:00Z',
    updatedAt: '2023-01-01T12:00:00Z',
  },
  {
    phoneNumber: 8765432109,
    createdAt: '2023-01-02T10:00:00Z',
    updatedAt: '2023-01-02T12:00:00Z',
  },
  {
    phoneNumber: 7654321098,
    createdAt: '2023-01-03T10:00:00Z',
    updatedAt: '2023-01-03T12:00:00Z',
  },
  {
    phoneNumber: 6543210987,
    createdAt: '2023-01-04T10:00:00Z',
    updatedAt: '2023-01-04T12:00:00Z',
  },
  {
    phoneNumber: 5432109876,
    createdAt: '2023-01-05T10:00:00Z',
    updatedAt: '2023-01-05T12:00:00Z',
  },
  {
    phoneNumber: 4321098765,
    createdAt: '2023-01-06T10:00:00Z',
    updatedAt: '2023-01-06T12:00:00Z',
  },
  {
    phoneNumber: 3210987654,
    createdAt: '2023-01-07T10:00:00Z',
    updatedAt: '2023-01-07T12:00:00Z',
  },
  {
    phoneNumber: 2109876543,
    createdAt: '2023-01-08T10:00:00Z',
    updatedAt: '2023-01-08T12:00:00Z',
  },
  {
    phoneNumber: 1098765432,
    createdAt: '2023-01-09T10:00:00Z',
    updatedAt: '2023-01-09T12:00:00Z',
  },
  {
    phoneNumber: 1987654321,
    createdAt: '2023-01-10T10:00:00Z',
    updatedAt: '2023-01-10T12:00:00Z',
  },
  {
    phoneNumber: 2987654321,
    createdAt: '2023-01-11T10:00:00Z',
    updatedAt: '2023-01-11T12:00:00Z',
  },
  {
    phoneNumber: 3987654321,
    createdAt: '2023-01-12T10:00:00Z',
    updatedAt: '2023-01-12T12:00:00Z',
  },
  {
    phoneNumber: 4987654321,
    createdAt: '2023-01-13T10:00:00Z',
    updatedAt: '2023-01-13T12:00:00Z',
  },
  {
    phoneNumber: 5987654321,
    createdAt: '2023-01-14T10:00:00Z',
    updatedAt: '2023-01-14T12:00:00Z',
  },
  {
    phoneNumber: 6987654321,
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-01-15T12:00:00Z',
  },
  {
    phoneNumber: 7987654321,
    createdAt: '2023-01-16T10:00:00Z',
    updatedAt: '2023-01-16T12:00:00Z',
  },
  {
    phoneNumber: 8987654321,
    createdAt: '2023-01-17T10:00:00Z',
    updatedAt: '2023-01-17T12:00:00Z',
  },
  {
    phoneNumber: 9987654321,
    createdAt: '2023-01-18T10:00:00Z',
    updatedAt: '2023-01-18T12:00:00Z',
  },
  {
    phoneNumber: 9087654321,
    createdAt: '2023-01-19T10:00:00Z',
    updatedAt: '2023-01-19T12:00:00Z',
  },
  {
    phoneNumber: 9087456321,
    createdAt: '2023-01-20T10:00:00Z',
    updatedAt: '2023-01-20T12:00:00Z',
  },
  {
    phoneNumber: 9087654322,
    createdAt: '2023-01-21T10:00:00Z',
    updatedAt: '2023-01-21T12:00:00Z',
  },
  {
    phoneNumber: 9087554321,
    createdAt: '2023-01-22T10:00:00Z',
    updatedAt: '2023-01-22T12:00:00Z',
  },
  {
    phoneNumber: 9087654221,
    createdAt: '2023-01-23T10:00:00Z',
    updatedAt: '2023-01-23T12:00:00Z',
  },
  {
    phoneNumber: 9087654320,
    createdAt: '2023-01-24T10:00:00Z',
    updatedAt: '2023-01-24T12:00:00Z',
  },
  {
    phoneNumber: 9087654323,
    createdAt: '2023-01-25T10:00:00Z',
    updatedAt: '2023-01-25T12:00:00Z',
  },
  {
    phoneNumber: 8087654321,
    createdAt: '2023-01-26T10:00:00Z',
    updatedAt: '2023-01-26T12:00:00Z',
  },
  {
    phoneNumber: 7087654321,
    createdAt: '2023-01-27T10:00:00Z',
    updatedAt: '2023-01-27T12:00:00Z',
  },
  {
    phoneNumber: 6087654321,
    createdAt: '2023-01-28T10:00:00Z',
    updatedAt: '2023-01-28T12:00:00Z',
  },
  {
    phoneNumber: 5087654321,
    createdAt: '2023-01-29T10:00:00Z',
    updatedAt: '2023-01-29T12:00:00Z',
  },
  {
    phoneNumber: 4087654321,
    createdAt: '2023-01-30T10:00:00Z',
    updatedAt: '2023-01-30T12:00:00Z',
  },
  {
    phoneNumber: 3087654321,
    createdAt: '2023-01-31T10:00:00Z',
    updatedAt: '2023-01-31T12:00:00Z',
  },
  {
    phoneNumber: 2087654321,
    createdAt: '2023-02-01T10:00:00Z',
    updatedAt: '2023-02-01T12:00:00Z',
  },
  {
    phoneNumber: 1087654321,
    createdAt: '2023-02-02T10:00:00Z',
    updatedAt: '2023-02-02T12:00:00Z',
  },
  {
    phoneNumber: 9078654321,
    createdAt: '2023-02-03T10:00:00Z',
    updatedAt: '2023-02-03T12:00:00Z',
  },
  {
    phoneNumber: 9077554321,
    createdAt: '2023-02-04T10:00:00Z',
    updatedAt: '2023-02-04T12:00:00Z',
  },
  {
    phoneNumber: 9077654321,
    createdAt: '2023-02-05T10:00:00Z',
    updatedAt: '2023-02-05T12:00:00Z',
  },
  {
    phoneNumber: 9077654320,
    createdAt: '2023-02-06T10:00:00Z',
    updatedAt: '2023-02-06T12:00:00Z',
  },
  {
    phoneNumber: 8077654321,
    createdAt: '2023-02-07T10:00:00Z',
    updatedAt: '2023-02-07T12:00:00Z',
  },
  {
    phoneNumber: 7077654321,
    createdAt: '2023-02-08T10:00:00Z',
    updatedAt: '2023-02-08T12:00:00Z',
  },
  {
    phoneNumber: 6077654321,
    createdAt: '2023-02-09T10:00:00Z',
    updatedAt: '2023-02-09T12:00:00Z',
  },
  {
    phoneNumber: 5077654321,
    createdAt: '2023-02-10T10:00:00Z',
    updatedAt: '2023-02-10T12:00:00Z',
  },
  {
    phoneNumber: 4077654321,
    createdAt: '2023-02-11T10:00:00Z',
    updatedAt: '2023-02-11T12:00:00Z',
  },
  {
    phoneNumber: 3077654321,
    createdAt: '2023-02-12T10:00:00Z',
    updatedAt: '2023-02-12T12:00:00Z',
  },
  {
    phoneNumber: 2077654321,
    createdAt: '2023-02-13T10:00:00Z',
    updatedAt: '2023-02-13T12:00:00Z',
  },
  {
    phoneNumber: 9077554320,
    createdAt: '2023-02-14T10:00:00Z',
    updatedAt: '2023-02-14T12:00:00Z',
  },
  {
    phoneNumber: 8077554321,
    createdAt: '2023-02-15T10:00:00Z',
    updatedAt: '2023-02-15T12:00:00Z',
  },
  {
    phoneNumber: 7077554321,
    createdAt: '2023-02-16T10:00:00Z',
    updatedAt: '2023-02-16T12:00:00Z',
  },
  {
    phoneNumber: 6077554321,
    createdAt: '2023-02-17T10:00:00Z',
    updatedAt: '2023-02-17T12:00:00Z',
  },
  {
    phoneNumber: 5077554321,
    createdAt: '2023-02-18T10:00:00Z',
    updatedAt: '2023-02-18T12:00:00Z',
  },
];

export default dummyData
