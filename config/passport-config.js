const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
 
function initialize(passport, getUserByEmail, getUserById) {
    console.log("Passport initialize ran")

    //AUTHENTICATE USER
    const authenticateUser = async (email, password, done) => 
    {
        const query = await getUserByEmail(email)
        console.log('Up next is the query output \n')
        console.log(query)
        if (query == null) 
        {
            return done(null, false, {message: 'That user or email does not exist' })
        }
        if (await bcrypt.compare(password, query.password)) 
        {
            console.log(query)
            const userr = {  
                id: query._id.toString(),
                username: query.email,
                password: query.password
            }
            console.log('The USERR FOR DONE')
            return done(null, userr, {message: 'Logged in'})
        } 
        else 
        {
            return done(null, false, { message: 'Password incorrect' })
        }

    }
    //SESSION STORAGE
    passport.use(new LocalStrategy({ user: 'username' }, 
        authenticateUser))

    //SERIALIZEUSER 
    passport.serializeUser((user, done) => 
    {
        console.log("Hello from serializerUser")
        console.log(user)
        return done(null, user.id.toString())
    })
    //DESERIALIZEUSER
    passport.deserializeUser(async (id, done) => 
    {
        console.log('Hello from deserializerUserrr')
        console.log(id)
        return done(null, await getUserById(id))
    })
}

module.exports = initialize