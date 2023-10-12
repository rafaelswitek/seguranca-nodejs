const { Router } = require('express')
const RoleController = require('../controllers/roleController')

const router = Router()

router
    .post('/role', RoleController.cadastrarRole)
    .get('/role', RoleController.buscarTodosRoles)
    .get('/role/:id', RoleController.buscarRolePorId)
    .delete('/role/:id', RoleController.deletarRolePorId)
    .put('/role/:id', RoleController.editarRole)

module.exports = router