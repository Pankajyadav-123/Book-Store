import userModel from "../models/userModel.js"

const addToCart = async (req,res) => {
    try {
        
        const { userId, itemId } = req.body
        console.log('=== ADD TO CART ===')
        console.log('Request body:', req.body)
        console.log('userId:', userId, 'itemId:', itemId)

        if (!userId) {
            return res.json({ success: false, message: 'User ID not found - Not logged in' })
        }

        if (!itemId) {
            return res.json({ success: false, message: 'Item ID is required' })
        }

        const userData = await userModel.findById(userId)
        
        if (!userData) {
            return res.json({ success: false, message: 'User not found in database' })
        }

        console.log('User found. Current cartData:', userData.cartData)

        // support legacy field `cartDate` if present
        let cartData = userData.cartData || userData.cartDate || {}

        if (cartData[itemId]) {
            cartData[itemId] += 1
        } else {
            cartData[itemId] = 1
        }

        console.log('Updated cartData:', cartData)

        userData.cartData = cartData
        // remove legacy field if it exists
        if (userData.cartDate) delete userData.cartDate
        userData.markModified('cartData')
        const savedData = await userData.save()
        
        console.log('Saved user cartData:', savedData.cartData)
        console.log('=== ADD TO CART SUCCESS ===')

        res.json({ success: true, message: "Added To Cart", cartData: savedData.cartData })

    } catch (error) {
        console.log('=== ERROR IN ADD TO CART ===')
        console.log('Error:', error.message)
        console.log('Stack:', error.stack)
        res.json({ success: false, message: error.message })
    }
}

// update user cart
const updateCart = async (req,res) => {
    try {
        
        const { userId ,itemId, quantity } = req.body

        const userData = await userModel.findById(userId)
        // support legacy field `cartDate` if present
        let cartData = userData.cartData || userData.cartDate || {};

        cartData[itemId] = quantity

        userData.cartData = cartData
        if (userData.cartDate) delete userData.cartDate
        userData.markModified('cartData')
        await userData.save()

        res.json({ success: true, message: "Cart Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// get user cart data
const getUserCart = async (req,res) => {

    try {
        
        const { userId } = req.body
        
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.json({ success: true, cartData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export { addToCart, updateCart, getUserCart }