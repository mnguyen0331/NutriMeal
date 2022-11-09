const bcrypt = require('bcrypt');

 function initialize(passport, getUserByEmailorUsername, getUserById) {

    //  CHECKS IF EMAIL EXIST AND IF PASSWORD IS CORRECT.
    // EMAIL AND PASSWORD ARE PASS BY or SET BY PASSPORT
    // AND THE ITS VALUES ARE WHAT IS PASSED BY REQ.BODY.EMAIL/PASSWORD 
    // THIS CAN ALSO MEAN THAT THE 'email' VARIABLE IS 'usernameField:'
    // THAT IS SET BY new LocalStragtegy
    const authenticateUser = async (email, password, done) => {
        // USER IS ACTUALLY THE EMAIL NAME
        const query = await getUserByEmailorUsername(email)
        console.log('Before query and query[0]')
        console.log(query);
        if (query == null) {
            return done(null, false, {message: 'That user or email does not exist' })
        }
        try {
            console.log('authenticateUser try block ran')
            if (await bcrypt.compare(password, query.Password)) {
                console.log('authenticateUser correct password')
                const idToString = query._id.toString()
                const user = {  id: idToString,
                                username: query.UserName,
                                email: query.Email,
                                extra: "myextra",
                                password: query.Password }
                return done(null, user)
            } else {
                console.log('authenticateUser incorrect password')
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (err) { return done(err) }
    }

    //TAKES IN TWO PARAMENTS - new LocalStragtegy & authenticateUser function
    passport.use(new LocalStrategy({ usernameField: 'email' }, 
    authenticateUser))

    //IN THE FOLLOWING - usernameField == user 
    //I DON'T NEED TO WORRY ABOUT THIS, I THINK. 
    passport.serializeUser((user, done) => {
        console.log("Hello from serializerUser")
        console.log(user)
        done(null, user.id.toString())
    })
    passport.deserializeUser(async (id, done) => {
        console.log('Hello from deserializerUserrr')
        console.log(id)
       return done(null, await getUserById(id))
    })
}

module.exports = initialize