import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {

    const { token } = req.headers;
    console.log('Auth middleware - token from headers:', token ? 'Present' : 'Missing')

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }

    try {

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log('Token decoded successfully. User ID:', token_decode.id)
        req.body.userId = token_decode.id
        next()

    } catch (error) {
        console.log('Token verification error:', error.message)
        res.json({ success: false, message: error.message })
    }

}

export default authUser