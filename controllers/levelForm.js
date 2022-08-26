import Form from '../models/knowLevel/Form.js'
import LevelLanguage from '../models/knowLevel/LevelLanguage.js'

const levelFormUSer = async (req, res) => {
    const { user } = req
    const answeringForm = new Form(req.body)
    answeringForm.userId = user._id
    try {
        await answeringForm.save()
        res.json(answeringForm)
    } catch (error) {
        console.log(error.message)
    }
}

export {
    levelFormUSer,
}