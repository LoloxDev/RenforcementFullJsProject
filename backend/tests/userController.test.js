const { login } = require('../src/Controllers/UserController');
const { find } = require('../src/Models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../src/Models/UserModel');
jest.mock('jsonwebtoken');

describe('UserController - login', () => {
  it('Doit retourner une 401 si l\'email ne correspond pas', async () => {

    find.mockResolvedValue([]);
  
    const req = { body: { email: 'azo@ao.fr', password: 'tet' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await login(req, res);
  
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email KO' });
  });
  

  it('Doit retourner une 401 car wrong mdp', async () => {

    const hashedPassword = await bcrypt.hash('password123', 10);
    find.mockResolvedValue([{ email: 'azo@azo.fr', password: hashedPassword }]);
  
    const compareSpy = jest.spyOn(bcrypt, 'compare').mockImplementation((plainPassword, hashedPassword) => {
      return bcrypt.compareSync(plainPassword, hashedPassword);
    });
  
    const req = { body: { email: 'azo@azo.fr', password: 'wrongPassword' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await login(req, res);
  
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'MDP KO' });
  
    compareSpy.mockRestore();
  });
});
