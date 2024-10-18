//使用Node.js 和 Express进行后端开发
const express = require("express");
const mysql = require('mysql2');

const app = express();
const port = 3000;

// 创建数据库连接
const pool = mysql.createPool({
    host: '112.124.65.59',      
    user: 'fortest',           
    password: 'az6KjRyP5sANCapw', 
    database: 'fortest',
    waitForConnections :true,
    connectionLimit:10,
    connectTimeout: 10000,
    keepAliveInitialDelay: 10000,
    queueLimit:0
}) 


pool.getConnection((err,connection) => {
    if (err) {
        console.error('无法获取数据库连接', err);
        return;
    }
    connection.query('SELECT * FROM contacts', (err, results) => {
        connection.release();  // 释放连接回连接池
        if (err) {
            console.error('查询出错', err);
            return;
        }
        //console.log(results);
    });
});


app.use(express.json())//中间键，用于解析json请求

//读取联系人数据
const readContacts = (callback) => {
  const query='SELECT * FROM contacts';
  pool.query(query,(err,results)=>{
    if(err){
        console.error('读取数据库联系人数据失败',err);
        callback(err,null); // 返回错误给调用者
        return;
    }
    callback(null,results);
  })
};

//写入联系人数据(更新数据库)

app.get('/contacts',(req,res)=>{
    readContacts((err,results)=>{
        if(err){
            return res.status(500).json({message:"服务器错误"});
        }
        res.json(results);
    });
});

app.post('/contacts',(req,res)=>{
    const{name,phone} = req.body;
    const query='INSERT INTO contacts (name, phone) VALUES (?, ?)';
    pool.query(query,[name,phone],(err,results)=>{
        if(err){
            return res.status(500).json({message:"服务器错误"});
        }
        readContacts((err,contacts)=>{
            if(err){
                return res.status(500).json({message:"服务器错误"});
            }
            res.json(contacts);
        })
    })
})

app.put('/contacts/:id',(req,res)=>{
    const{id}=req.params;
    const{name,phone}=req.body;
    const query='UPDATE contacts SET name = ?, phone = ? WHERE id = ?';
    pool.query(query,[name,phone,id],(err,results)=>{
        if(err){
            console.error('数据更新失败',err)
            return res.status(500).json({message:"服务器错误"});
        }
        readContacts((err,contacts)=>{
            if(err){
                return res.status(500).json({message:"服务器错误"});
            }
            res.json(contacts);
        });
    })
});


app.delete('/contacts/:id',(req,res)=>{
    const{id} = req.params;
    const query='DELETE FROM contacts WHERE id = ?';
    pool.query(query,[id],(err,results)=>{
        if(err){
            console.error('数据删除失败',err);
            return res.status(500).json({message:"服务器错误"});
        }
        readContacts((err,contacts)=>{
            if(err){
                return res.status(500).json({message:"服务器错误"});
            }
            res.json(contacts);
        })
    })
});

app.listen(port,()=>{
    console.log(`服务器运行在 http://localhost:${port}`)
});