import userLanding from '../models/landingPage/usersLanding.js'

const register = async (req, res) => {
    const { email } = req.body
    const user = req.body

    const exist = await userLanding.findOne({email})

    if(!exist) {
        const newUser = new userLanding(req.body)
        await newUser.save()
        res.json({newUser})
    }else {
        return res.json({ msg: "Already registered"})
    }
}


export {register}