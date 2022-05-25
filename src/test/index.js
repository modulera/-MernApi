import db, { User } from '../models';

// import sequelizeParser from '../helpers/sequelizeParser';

const userCreate = async (role = 'user') => {
    return await User.create({
        firstName: 'Mustafa',
        lastName: 'Akbaş',
        email: 'mustafa@akbas.net',
        password: '52835283',
        role: ['user', 'admin'].includes(role) ? role : 'user',
    });
}


(async () => {
    try {
        // console.log(User)
        await db.connected()

        let user;
        User.sync();

        // user = await userCreate()
        // console.log(user)
        // user.fullName = 'Someone Else';
        // await user.save()

        user = await User.findOne();
        console.log(user);

        // const isMatched = await user.isValidPassword('52835283')
        // console.log('isMatched', isMatched)

    } catch (error) {
        // console.error(sequelizeParser(error))

        if (error.errors) {
            console.error(`Error => ${typeof error}:`, error.errors)
        } else {
            console.error(`Error => ${typeof error}:`, error)
        }
    }
})();