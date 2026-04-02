const { authenticate } = require('../src/middlewares/auth');
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = 'testsecret';

describe('authenticate middleware', () => {
  it('responds with 401 when no token is provided', () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'No token provided' });
    expect(next).not.toHaveBeenCalled();
  });

  it('responds with 403 when token is invalid', () => {
    const invalidToken = 'invalid';
    const req = { headers: { authorization: `Bearer ${invalidToken}` } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next and attaches user when token is valid', () => {
    const user = { id: 1, role: 'user' };
    const token = jwt.sign(user, process.env.JWT_SECRET);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    authenticate(req, res, next);

    expect(req.user).toEqual(expect.objectContaining(user));
    expect(next).toHaveBeenCalled();
  });
});
