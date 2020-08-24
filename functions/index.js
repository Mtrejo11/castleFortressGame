const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp()


exports.registerUser = functions.https.onCall(async (data, context) => {

    try {
        const newUser = await admin.auth().createUser({
            email: data.email,
            password: data.password,
            displayName: data.username,
            emailVerified: true,
        })
        console.log('USER', newUser);
        await admin.firestore().collection('users').doc(newUser.uid).set({
            email: data.email,
            username: data.username
        })
        await admin.auth().setCustomUserClaims(newUser.uid, { role: 'player' })
        return { status: true, message: newUser }

    } catch (error) {
        return { status: false, message: error }
    }
});
