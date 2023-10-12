const PermissaoService = require('../services/permissaoService')
const permissaoService = new PermissaoService()

class PermissaoController {
    static async cadastrarPermissao(req, res) {
        const { nome, descricao} = req.body
        
        try {
            const role = await permissaoService.cadastrarPermissao({ nome, descricao})
            
            res.status(201).json(role)
            
        } catch (error) {
            console.log('Message error: ', error.message)
            res.status(400).send({ message: error.message })
        }
    }
    
    static async buscarTodosPermissaos(req, res) {
        const roles = await permissaoService.buscarTodosPermissaos()
        
        res.status(200).json(roles)
    }
    
    static async buscarPermissaoPorId(req, res) {
        try {
            const { id } = req.params
            const role = await permissaoService.buscarPermissaoPorId(id)
            
            res.status(200).json(role) 
        } catch (error) {
            console.log('Message error: ', error.message)
            res.status(400).send({ message: error.message })
        }
    }
    
    static async deletarPermissaoPorId(req, res) {
        const { id } = req.params
        
        try {
            await permissaoService.deletarPermissaoPorId(id)
            
            res.status(200).send({ message: 'Permissao deletada com sucesso!' })
            
        } catch (error) {
            console.log('Message error: ', error.message)
            res.status(400).send({ message: error.message })
        }
    }
    
    static async editarPermissao(req, res) {
        const { id } = req.params
        const { nome, descricao} = req.body
        
        try {
            const role = await permissaoService.editarPermissao({ id, nome, descricao})
            
            res.status(200).json(role)
        } catch (error) {
            console.log('Message error: ', error.message)
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = PermissaoController