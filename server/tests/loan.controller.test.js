jest.mock('../src/models/loan', () => ({
  create: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
}));
jest.mock('../src/models/repayment', () => ({}));
jest.mock('../src/models/user', () => ({
  hasOne: jest.fn(),
  belongsTo: jest.fn(),
  hasMany: jest.fn(),
  findByPk: jest.fn(),
  findOne: jest.fn()
}));
jest.mock('../src/models/wallet', () => ({
  hasMany: jest.fn(),
  belongsTo: jest.fn(),
  increment: jest.fn(),
  decrement: jest.fn(),
}));
jest.mock('../src/models/transaction', () => ({
  create: jest.fn(),
  belongsTo: jest.fn()
}));
jest.mock('../src/models/AuditLog', () => ({
  create: jest.fn()
}));
jest.mock('../src/models/PendingAction', () => ({
  create: jest.fn()
}));
jest.mock('../src/models/Partner', () => ({
  findOne: jest.fn()
}));
jest.mock('../src/providers/BankingProvider', () => ({}));
jest.mock('../src/services/QueueService', () => ({}));
jest.mock('../src/services/SignatureProvider', () => ({
  generateContract: jest.fn()
}));

const createLoanController = require('../src/Controllers/loancontrollers');
const Loan = require('../src/models/loan');

const mockScoringService = {
  calculateScore: jest.fn()
};
const loanController = createLoanController(mockScoringService);

process.env.JWT_SECRET = 'testsecret';

function mockResponse() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('loan controllers', () => {
  afterEach(() => jest.clearAllMocks());

  test('applyLoan creates loan with grade and returns 201', async () => {
    const req = { body: { amount: 1000 }, user: { id: 1 } };
    const res = mockResponse();
    const createdLoan = { id: 1 };

    // Mock User and Wallet
    const User = require('../src/models/user');
    const Wallet = require('../src/models/wallet');
    User.findByPk = jest.fn().mockResolvedValue({ id: 1, financePreference: 'CONVENTIONAL', Wallet: { id: 1, balance: 0 } });
    
    const Partner = require('../src/models/Partner');
    Partner.findOne.mockResolvedValue({ id: 1, name: 'Test Partner', type: 'CONVENTIONAL' });

    // Mock Scoring Service to return 750 (Grade A)
    mockScoringService.calculateScore.mockResolvedValue(750);

    Loan.create.mockResolvedValue(createdLoan);
    Wallet.increment = jest.fn().mockResolvedValue([1]);
    const Transaction = require('../src/models/transaction');
    Transaction.create = jest.fn().mockResolvedValue({});
    
    const SignatureProvider = require('../src/services/SignatureProvider');
    SignatureProvider.generateContract.mockResolvedValue({ status: 'Pending Signature' });

    await loanController.applyLoan(req, res);

    expect(Loan.create).toHaveBeenCalledWith(expect.objectContaining({
      amount: 1000,
      UserId: 1,
      status: 'pending_signature',
      creditGrade: 'A',
      interestRate: 0.05
    }));
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ loan: createdLoan }));
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
