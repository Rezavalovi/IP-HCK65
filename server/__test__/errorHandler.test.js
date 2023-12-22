const { errorHandler, sendError } = require('../middlewares/errorHandler'); 

describe('Error Handler', () => {
    let mockRes;

    beforeEach(() => {
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    test('should handle BadRequest error', () => {
        const error = { name: 'BadRequest', message: 'Custom Bad Request' };
        errorHandler(error, null, mockRes, null);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Custom Bad Request' });
    });

    test('should handle default error', () => {
        const error = { name: 'OtherError', status: 500, message: 'Default Error' };
        errorHandler(error, null, mockRes, null);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Default Error' });
    });
});
