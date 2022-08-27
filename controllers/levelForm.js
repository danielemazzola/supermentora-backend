import Forms from '../models/knowLevel/Forms.js'
import LevelLanguage from '../models/knowLevel/LevelLanguage.js'

const createForm = async (req, res) => {
    const { user } = req
    const answeringForm = new Forms(req.body)
    answeringForm.userId = user._id
    const lengthTitle = answeringForm.title.title.length
    const lengthDescription = answeringForm.title.description.length
    if(lengthTitle > 0) {
        if(lengthDescription > 0) {
            try {
                await answeringForm.save()
                res.json(answeringForm)
            } catch (error) {
                console.log(error.message)
            }
        } else {
            return res.json({ msg: "the description is required"})
        }

    } else {
        return res.json({ msg: "the title is required"})
    }
    
}

const deleteForm = async (req, res) => {
    const { id } = req.params
    const { user } = req
    const form = await Forms.findById(id)
    if(!form) {
        return res.status(400).json({ status: 400, msg: "Questionnaire does not exist" })
    }
    if(form.userId.toString() !== user._id.toString()) {
        return res.status(401).json({ status: 401, msg: "Not authorized" })
    }
    try {
        const deleteForm = await form.delete()
        res.json({"id": deleteForm._id})
    } catch (error) {
        return res.status(403).json({ status: 403, msg: error.message })
    }
}

export {
    createForm,
    deleteForm,
}