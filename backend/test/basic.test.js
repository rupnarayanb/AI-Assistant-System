const jwt = require('jsonwebtoken');
const db = require('../db');
const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const userController = require('../controllers/controllers');   



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
