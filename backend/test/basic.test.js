const jwt = require('jsonwebtoken');
const db = require('../db');
const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const userController = require('../controllers/controllers');   
const app = require('../index'); // Import your Express app
const request = require('supertest');
const authinticationError = require('../errors/AuthintacationError');
const AuthenticationError = require('../errors/AuthintacationError');



test("loginUser should return error if no matching user is found", async () => {
    jest.spyOn(db, 'query').mockResolvedValue({ rows: [] }); // Mock the database query to return no user

    const userData = { email: "nonexistent@example.com", password: "testpassword" };
    await expect(userService.loginUser(userData)).rejects.toThrow('User not found');

    db.query.mockRestore(); // Restore the original implementation of db.query


});

test("loginUser should return error if password is incorrect", async () => {
    const mockUser = { email: "test@example.com", password: "hashedpassword" };
    jest.spyOn(db, 'query').mockResolvedValue({ rows: [mockUser] }); // Mock the database query to return a user
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false); // Mock bcrypt.compare to return false (incorrect password)

    const userData = { email: "test@example.com", password: "wrongpassword" };
    await expect(userService.loginUser(userData)).rejects.toThrow('Invalid credentials');

    db.query.mockRestore(); // Restore the original implementation of db.query
    bcrypt.compare.mockRestore(); // Restore the original implementation of bcrypt.compare
});


test("loginUser should return user data if credentials are correct", async () => {
    const mockUser = {
    id: 1,
    name: "Test User",
    email: "test@example.com",
    password: "hashedpassword",
    role: "user"
};
    jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockUser] }).mockResolvedValueOnce({rows:[{email: "test@example.com", id: 1, name: "Test User", role: "user"}]}); // Mock the database query to return a user
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true); // Mock bcrypt.compare to return true (correct password)

    

    const userData = { email: "test@example.com", password: "testpassword" };
    const result = await userService.loginUser(userData);

    expect(db.query).toHaveBeenCalledTimes(2);

   expect(result.user).toEqual({
        id: 1,
        name: "Test User",
        email: "test@example.com",
        role: "user"
    });

    expect(result.accessToken).toBeDefined();
    expect(result.refreshToken).toBeDefined();

    db.query.mockRestore(); // Restore the original implementation of db.query
    bcrypt.compare.mockRestore(); // Restore the original implementation of bcrypt.compare
   
});

test("userController.loginUser should return 200 and user data if credentials are correct", async () => {
    const request = {
        body: {
            email: "test@example.com",
            password: "testpassword"
        }
    };

    const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    const next = jest.fn();

    const mockUser = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        role: "user"
    };

     jest.spyOn(userService, 'loginUser').mockResolvedValue({
        user: mockUser,
        accessToken: "mockAccessToken",
        refreshToken: "mockRefreshToken"
    });

    await userController.loginUser(request, response, next);

   

    expect(userService.loginUser).toHaveBeenCalledWith(request.body);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
        message: "Login successful",
        user: mockUser,
        accessToken: "mockAccessToken",
        refreshToken: "mockRefreshToken"
    });

});


test("userController.loginUser should call next with error if login fails", async () => {
    const request = {
        body: {
            email: "test@example.com",
            password: "wrongpassword"
        }
    };

    const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    const next = jest.fn();

    jest.spyOn(userService, 'loginUser').mockRejectedValue(new Error("Invalid credentials"));

    await userController.loginUser(request, response, next);

    expect(userService.loginUser).toHaveBeenCalledWith(request.body);
    expect(next).toHaveBeenCalledWith(new Error("Invalid credentials"));
    userService.loginUser.mockRestore();
});

test("POST /api/login should return 200 and user data if credentials are correct", async () => {



    const mockUser = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        role: "user"
    };

    




    jest.spyOn(userService, 'loginUser').mockResolvedValue({
         user: mockUser,
        accessToken: "mockAccessToken",
        refreshToken: "mockRefreshToken"

    });

    const response = await request(app).post('/api/login').send({
        email: "test@example.com",
        password: "testpassword"
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        message: "Login successful",
        user: mockUser,
        accessToken: "mockAccessToken",
        refreshToken: "mockRefreshToken"
    });

    userService.loginUser.mockRestore();


})


test("POST /api/login should return 401 when credentials are invalid", async () => {

    const error = new AuthenticationError("Invalid credentials");
    jest.spyOn(userService, 'loginUser').mockRejectedValue(error);

    const response = await request(app).post('/api/login').send({
        email: "test@example.com",
        password: "wrongpassword"
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
        message: "Invalid credentials",
        status:401
    });

    userService.loginUser.mockRestore();
});

test("refreshToken should return new access token if refresh token is valid", async () => {
    const mockRefreshToken = "validRefreshToken";
    const mockUserId = 1;
    const mockUser = { id: mockUserId, email: "test@example.com", role: "user" };

    jest.spyOn(jwt, 'verify').mockReturnValue({ id: mockUserId });
    jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ user_id: mockUserId, token: mockRefreshToken }] }).mockResolvedValueOnce({ rows: [mockUser] }); // Mock the database query to return a valid refresh token
    jest.spyOn(jwt, 'sign').mockReturnValue("newAccessToken");

    const newAccessToken = await userService.refreshAccessToken(mockRefreshToken);

    expect(jwt.verify).toHaveBeenCalledWith(mockRefreshToken, expect.any(String));
    expect(db.query).toHaveBeenCalledTimes(2);
    expect(jwt.sign).toHaveBeenCalledWith({ id: mockUserId, email: mockUser.email, role: mockUser.role }, expect.any(String), { expiresIn: '1h' });
    expect(newAccessToken).toBe("newAccessToken");

    jwt.verify.mockRestore();
    db.query.mockRestore();
    jwt.sign.mockRestore();
})