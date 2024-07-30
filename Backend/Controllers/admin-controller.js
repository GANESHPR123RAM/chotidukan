const User = require('../models/user-model');
const Contact = require('../models/contact-model');
const addToCart =require('../models/addToCart-model')



const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        console.log(users);
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No Users Found" });
        }
        return res.status(200).json(users)
    } catch (error) {
        next(error);
    }

}
const getUserById = async (req, res) => {

    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 });
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }

}

const updatUserById = async (req, res) => {
    try {

        const id = req.params.id;
        const updateUserData = req.body;
        const updatedData = await User.updateOne({ _id: id }, {
            $set:updateUserData,
        })
        return res.status(200).json(updatedData)

    } catch (error) {
        next(error)
    }
}


const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: "User Deleted Successfuly" });
    } catch (error) {
        next(error);
    }
}

// contact data delete

const deleteContactById = async (req, res) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({ _id: id });
        return res.status(200).json({ message: "Contact Deleted Successfuly" });
    } catch (error) {
        next(error);
    }
}

// 


const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No Contacts Found" });
        }
        return res.status(200).json(contacts)
    } catch (error) {
        next(error);
    }

}

// 
const getAllOrders = async (req,res) => {

    try {
        const orders = await addToCart.find();
        if(!orders || orders.length === 0 ) {
            return res.status(404).json({message: "No Orders found"})
        }
        return res.status(200).json(orders)
    } catch (error) {
        next(error);
    }
}
// 


module.exports = { getAllUsers, getAllContacts, deleteUserById, getUserById, updatUserById, deleteContactById ,getAllOrders};
