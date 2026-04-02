jest.mock('../src/models/loan', () => ({
  create: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
}));
jest.mock('../src/models/repayment', () => ({}));
jest.mock('../src/models/user', () => ({}));

const loanController = require('../src/Controllers/loancontrollers');
const Loan = require('../src/models/loan');

process.env.JWT_SECRET = 'testsecret';

function mockResponse() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('loan controllers', () => {
  afterEach(() => jest.clearAllMocks());

  test('applyLoan creates loan and returns 201', async () => {
    const req = { body: { amount: 100, dueDate: '2024-01-01' }, user: { id: 1 } };
    const res = mockResponse();
    const createdLoan = { id: 1 };
    Loan.create.mockResolvedValue(createdLoan);

    await loanController.applyLoan(req, res);

    expect(Loan.create).toHaveBeenCalledWith({
      amount: 100,
      dueDate: '2024-01-01',
      UserId: 1,
      status: 'pending'
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdLoan);
  });

  test('getLoan responds 404 when loan not found', async () => {
    const req = { params: { id: 2 }, user: { id: 1 } };
    const res = mockResponse();
    Loan.findOne.mockResolvedValue(null);

    await loanController.getLoan(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Loan not found' });
  });

  test('approveLoan forbids non-admin users', async () => {
    const req = { user: { role: 'user' }, params: { id: 1 } };
    const res = mockResponse();

    await loanController.approveLoan(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden' });
  });
});
