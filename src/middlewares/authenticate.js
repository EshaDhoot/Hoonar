import UserService from "../services/user-service.js";

const userService = new UserService();

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        
        next();
        // return res.status(200).json({
        //     message: 'User is Authenticated and token is valid',
        //     success: true,
        //     data: response,
        //     err: {}
        // });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Unauthorize access',
            data: {},
            success: false,
            err: error
        });
    }
}