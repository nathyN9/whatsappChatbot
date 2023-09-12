const conexion = require('../../../../config/conexion');

exports.getAllUsers = async(req, res)=>{
    const sql = `SELECT * FROM tb_users`
    conexion.query(sql, (error, rows)=>{
        if (error) {
            res.json(error)
        } else {
            res.json(rows)
        }
    })
};

exports.getById = async(req, res)=>{
    const {id} = req.params
    const sql = `SELECT * FROM tb_users WHERE id = ${id}`
    conexion.query(sql, (error, rows)=>{
        if (error) {
            res.json(error)
        } else {
            res.json(rows)
        }
    })
};

exports.createUser = async(req, res)=>{
    const {id, user_name, rol, email, phone, active, id_type} = req.body;
    const sql = `INSERT INTO tb_users (id, user_name, rol, email, phone, active, id_type) VALUES ('${id}', '${user_name}', '2', '${email}', '${phone}', '1', '${id_type}')`
    conexion.query(sql, (error, rows)=>{
        if (error) {
            res.json(error)
        } else {
            res.json(rows)
        }
    })
};

exports.updateUser = async(req, res)=>{
    const {id, user_name, rol, email, phone, active, id_type} = req.body;
    const sql = `UPDATE tb_users SET  id=${id}, user_name=${user_name}, rol=${rol}, email=${email}, phone=${phone}, active=${active}, id_type=${id_type})`
    conexion.query(sql, (error, rows)=>{
        if (error) {
            res.json(error)
        } else {
            res.json(rows)
        }
    })
};

exports.authUser = async(req, res)=>{
    const {id} = req.params;
    console.log("Id: "+id)
    const sql = `SELECT * FROM tb_users WHERE id=${id}`
    conexion.query(sql, (error, row)=>{
        if (error) {
            res.json(error)
        } else {
            if (row.length) {
                console.log("4")
                res.json(row)
            } else {
                console.log("1")
                res.json("USER_DOES_NOT_EXISTS")
            }
        }
    })
};

const getAllQuestions = async () => {
    const [query] = await connection.execute ('SELECT * from tb_master_questions');
    return query;
}

const getQuestionsByParent = async (padre) => {
    const [query] = await connection.execute ('SELECT * from tb_master_questions where padre=?',[padre]);
    return query;
}

const createQuestion = async (id, pregunta, padre) => {
    const [query] = await connection.execute ('INSERT INTO tb_master_questions (id, pregunta, padre) VALUES (?,?,?)', [id, pregunta, padre]);
    return query;
}
const editQuestion = async (pregunta, padre, id) => {
    const [query] = await connection.execute ('UPDATE tb_master_questions SET pregunta=?, padre=? WHERE id=?', [pregunta, padre, id]);
    return query;
}
const deleteQuestion = async (id) => {
    const [query] = await connection.execute ('DELETE FROM tb_master_questions WHERE id=?', [id]);
    return query;
}

