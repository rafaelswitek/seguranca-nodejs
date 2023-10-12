const { Router } = require('express')
const PermissaoController = require('../controllers/permissaoController')
const autenticado = require('../middleware/autenticado')

const router = Router()

router.use(autenticado)

router
    .post('/permissao', PermissaoController.cadastrarPermissao)
    .get('/permissao', PermissaoController.buscarTodosPermissaos)
    .get('/permissao/:id', PermissaoController.buscarPermissaoPorId)
    .delete('/permissao/:id', PermissaoController.deletarPermissaoPorId)
    .put('/permissao/:id', PermissaoController.editarPermissao)

module.exports = router