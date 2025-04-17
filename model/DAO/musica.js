/************************************************************
 * Objetivo: Model responsavel pelo CRUD de dados 
 * Data: 13/02/2025
 * Autor: Lara Machado
 * Versão: 1.0
 **************************************************************/

//import da biblioteca Prisma/Client
const { PrismaClient } = require('@prisma/client')

//instanciando (criar um novo objeto) para realizar a manipulação do script SQL
const prisma = new PrismaClient()

//função para inserir uma nova música no banco de dados
const insertMusica = async function(musica){
    try {
        let sql = `insert into tbl_musica ( nome,
                                            duracao,
                                            data_lancamento,
                                            foto_capa,
                                            letra
                                            )
                                    values (
                                            '${musica.nome}',
                                            '${musica.duracao}',
                                            '${musica.data_lancamento}',
                                            '${musica.foto_capa}',
                                            '${musica.letra}'
                                            )`

        //executa o script SQL no DB e aguarda o retorno do DB
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        

    } catch (error) {
        return false
    }
}

//função para atualizar uma música existente no banco de dados
const updateMusica = async function(musica){
    try {
        let sql = `update tbl_musica set  nome = '${musica.nome}',
                                            duracao = '${musica.duracao}',
                                            data_lancamento = '${musica.data_lancamento}',
                                            foto_capa = '${musica.foto_capa}',
                                            letra = '${musica.letra}'
                            where id=${musica.id}
                                            `
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//função para excluir uma música existente no banco de dados
const deleteMusica = async function(id){
    try {
        //script sql
        let sql = 'delete from tbl_musica where id='+id
        
        //executa o script
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para retornar todas as músicas do banco de dados
const selectAllMusica = async function(){
    try {
        // script SQL
        let sql = 'select * from tbl_musica order by id desc'

        //executa o script sql no db e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//função para listar uma música pelo ID no banco de dados
const selectByIdMusica = async function(id){
    try {
        //script sql
        let sql = 'select * from tbl_musica where id='+id

        //executa o script
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    insertMusica,
    updateMusica,
    deleteMusica,
    selectAllMusica,
    selectByIdMusica
}