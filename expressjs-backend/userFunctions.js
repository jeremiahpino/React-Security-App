const mongoose = require("mongoose");
const userModel = require("./userSchema");
mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/userSchema", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));


// get user by name or password
async function getUsers(username, password) {
  
  let result;

  if ( (username === undefined) && (password === undefined) ) {
    result = await userModel.find();
  } else if (username && !password) {
    result = await findUserByName(username);
  } else if (password && !username) {
    result = await findUserByPasssword(password);
  }
  return result;
}

// find user by id
async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

// add a user to the database
async function addUser(user) {
  try {
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findExactUser(username, password) {

    try {
        // find user in database
        result =  await findSpecificUser(username, password)
        console.log(result);
        return result;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

async function findUserByName(username) {
  return await userModel.find({ username: username });
}

async function findUserByPasssword(password) {
  return await userModel.find({ password: password });
}

async function findSpecificUser(uname, pword) {
    return await userModel.find({$and: [ {username : uname}, {password : pword} ] })
}

async function deleteUser(id) {
  return await userModel.findByIdAndDelete(id);
}


exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.findExactUser = findExactUser;
exports.deleteUser = deleteUser;