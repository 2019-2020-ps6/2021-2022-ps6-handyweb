const { Router } = require('express')

const manageAllErrors = require('../../../utils/routes/error-management')
const { User, Config} = require("../../../models");
const { filterConfigsFromUser } = require("./manager");
const {getConfigFromUser} = require("./manager");

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
    try {
        // Check if userId exists, if not it will throw a NotFoundError
        User.getById(req.params.userId)
        res.status(200).json(filterConfigsFromUser(req.params.userId))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/:configId', (req, res) => {
    try {
        // Check if userId  exists, if not it will throw a NotFoundError
        User.getById(req.params.userId)
        const config = getConfigFromUser(req.params.userId, req.params.configId)
        res.status(200).json(config)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
    try {
        // Check if userId exists, if not it will throw a NotFoundError
        User.getById(req.params.userId)
        const userId = parseInt(req.params.userId, 10)
        let config = Config.create({ name: req.body.name, userId: userId, size: req.body.size })

        // If answers have been provided in the request, we create the answer and update the response to send.
        res.status(201).json(config)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.put('/:configId', (req, res) => {
    try {
        res.status(200).json(Config.update(req.params.configId, req.body))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.delete('/:configId', (req, res) => {
    try {
        Config.delete(req.params.configId)
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router
