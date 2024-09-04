const User = require("../models/userModel");



exports.addUserForm = (req, res) => {
    res.render("addUser");
};



exports.addUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.redirect('/users');
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.render("users", { users });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send("User not found");
        res.render("editUser", { user });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) return res.status(404).send("User not found");
        res.redirect('/users');
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send("User not found");
        res.redirect('/users');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
