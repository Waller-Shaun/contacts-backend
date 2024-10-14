//使用Node.js 和 Express进行后端开发
const express = require("express");
const mysql = require('mysql2');

const app = express();
const port = 3000;

// 创建数据库连接
const connection = mysql.createConnection({
    host: '112.124.65.59',      // MySQL服务器地址
    user: 'fortest',           // MySQL用户名
    password: 'az6KjRyP5sANCapw', // MySQL密码
    database: 'fortest'  // 你创建的数据库名
  });

connection.connect((err) => {
if (err) {
  console.error('数据库连接失败:', err.stack);
  return;
}
console.log('成功连接到数据库');
});


app.use(express.json())//中间键，用于解析json请求

//读取联系人数据
const readContacts = (callback) => {
  const query='SELECT * FROM contacts';
  connection.query(query,(err,results)=>{
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
    connection.query(query,[name,phone],(err,results)=>{
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
    connection.query(query,[name,phone,id],(err,results)=>{
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
    connection.query(query,[id],(err,results)=>{
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