const User = require('../models/user-model');
const bcrypt = require("bcryptjs");
// const Otp = require('../models/Otp')

// const mailer = require("../validators/mailer");

// home logic //
const home = async (req, res) => {
    try {
        res.status(200).send("Home page code via controller");
    } catch (error) {
        console.log(error);
    }
};


// register logic //

const register = async (req, res, next) => {
    try {
        console.log('Request Body:', req.body); // Add this line
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: 'Email already exists' });
        }

        // Create the user
        const userCreated = await User.create({ username, email, phone, password });

        // const msg = '<p>Hello '+username+', please <a href="http://localhost:5173/">Verify</a> your mail</p>';

        // mailer.sendMail(email, 'Mail Verificatio', msg);

        // res.status(201).json({ message: "User registered successfully" });
        res.status(201).json({
            msg: "Registration Successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
    } catch (error) {
        // res.status(500).json({ message: "Internal server error" });
        next(error)
    }
};

// login logic //

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        console.log(userExist);
        if (!userExist) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, userExist.password);
        // const isMatch = await userExist.comparePassword(password)
        if (isMatch) {
            res.status(200).json({
                msg: "Login successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            return res.status(401).json({ msg: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


//user logic


const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData });

    } catch (error) {
        console.log(`error from the user route ${error}`);
    }
}


const updateUser = async (req, res, next) => {
    try {
        const userId = req.user._id; // Assuming the user ID is stored in the req.user object by the auth middleware
        const updateUserData = req.body;
        const updatedData = await User.findByIdAndUpdate(userId, updateUserData, { new: true });

        if (!updatedData) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
}




// const sendOtp = async (req, res) => {
//     try {

//         const errors = validationResult(req);

//         if (!errors.isEmpty()) {
//             return res.statu(400).json({
//                 success: false,
//                 msg: 'Errors',
//                 errors: errors.array()
//             })
//         }

//         const { email } = req.body;

//         const userData = await User.findOne({ email });

//         if (!userData) {
//             return res.statu(400).json({
//                 success: false,
//                 msg: "Email doesn't exists"
//             })
//         }

//         if (userData.is_verified == 1) {
//             return res.statu(400).json({
//                 success: false,
//                 msg: userData.email + "Email doesn't exists"
//             })
//         }

//         const msg = "<p>Hello +userData.username+</p>";

//     } catch (error) {
//         return res.statu(400).json({
//             success: false,
//             msg: error.message
//         })
//     }
// }



module.exports = { home, register, login, user, updateUser };
