const User_Model = require('../models/User.js')

const getUserByEmail = async (email) => 
{
    console.log('getUserByEmail function Ran')
    try 
    {
        const queryByEmail = await User_Model.findOne({email: email})
        return queryByEmail;
    }
    catch(err) {
        console.log("Error in getUserByEmailorUsername \n" + err );
    }

}

const getUserById = async (id) => 
{
    console.log('getUserByEmail function Ran')
    try 
    {
        const queryByID = await User_Model.findOne({_id: id})
        return queryByID;
    }
    catch(err) {
        console.log("Error in getUserById \n" + err );
    }
}

exports.getUserByEmail = getUserByEmail
exports.getUserById = getUserById