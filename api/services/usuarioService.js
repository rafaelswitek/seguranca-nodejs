const { v4: uuidv4 } = require('uuid')
const database = require('../models')
const { hash } = require('bcryptjs')

class UsuarioService {
    async cadastrarUsuario(dto) {
        const usuario = await database.usuarios.findOne({
            where: {
                email: dto.email
            }
        });

        if (usuario) {
            throw new Error('Usuario já cadastrado');
        }

        const senhaHash = await hash(dto.senha, 8)

        try {
            const newUsuario = await database.usuarios.create({ 
                id: uuidv4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash,
            });

            return newUsuario;
        } catch (error) {
            console.error('Message error: ', error.message);
            throw error;
        }
    }

    async buscarTodosUsuarios() {
        const usuarios = await database.usuarios.findAll()

        return usuarios;
    }

    async buscarUsuarioPorId(id) {
        const usuario = await database.usuarios.findOne({
            where: {
                id: id
            }
        });

        if (!usuario) {
            throw new Error('Usuario informado não cadastrado!')
        }

        return usuario;
    }

    async deletarUsuarioPorId(id) {
        const usuario = await database.usuarios.findOne({
            where: {
                id: id
            }
        });

        if (!usuario) {
            throw new Error('Usuario informado não cadastrado!')
        }

        try {
            await database.usuarios.destroy({
                where: {
                    id: id
                }
            });
        } catch (error) {
            console.error('Message error: ', error.message)
            throw error;
        }
    }

    async editarUsuario(dto) {
        const usuario = await database.usuarios.findOne({
            where: {
                id: dto.id
            }
        });

        if (!usuario) {
            throw new Error('Usuario informado não cadastrado!')
        }

        try {
            usuario.nome = dto.nome
            usuario.email = dto.email
            usuario.senha = dto.senha

            await usuario.save()

            return await usuario.reload()
        } catch (error) {
            console.error('Message error: ', error.message)
            throw error
        }
    }
}

module.exports = UsuarioService