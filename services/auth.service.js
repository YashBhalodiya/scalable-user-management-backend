const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT_ROUNDS = 10
const JWT_SECRET = process.env.JWT_SECRET || 'secretpassword'

const authService = {
    async hashPassword(plainPassword){
        return await bcrypt.hash(plainPassword, SALT_ROUNDS)
    },

    async comparePasswords(plainPassword, hashedpassword){
        return await bcrypt.compare(plainPassword, hashedpassword)
    },

    generateToken(user) {
        const payload = {
            id: user.id,
            username: user.name,
            role: user.role
        }

        return jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'})
    }
}

module.exports = authService