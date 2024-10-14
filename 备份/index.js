//使用Node.js 和 Express进行后端开发
const express = require("express");
const fs = require('fs');  // 引入文件系统模块
const app = express();
const port = 3000;

// 创建数据库连接
const connection = mysql.createConnection({
    host: '112.124.65.59',      // MySQL服务器地址
    user: 'for_test',           // MySQL用户名
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

//读取联系人数据（模拟数据库)
const readContacts = () => {
  // 使用 fs.readFileSync 读取 contacts.json 文件内容
  const data = fs.readFileSync('contacts.json', 'utf-8');
  return JSON.parse(data);
};

//写入联系人数据(更新数据库)
const writeContacts = (contacts)=>{
    fs.writeFileSync('contacts.json',JSON.stringify(contacts,null,2));
};

app.get('/contacts',(req,res)=>{
    const contacts = readContacts();
    res.json(contacts);
});

app.post('/contacts',(req,res)=>{
    const contacts = readContacts();
    const newContact = req.body;

    newContact.id = Date.now();
    contacts.push(newContact);
    writeContacts(contacts);

    res.json(newContact);
})

app.put('/contacts/:id',(req,res)=>{
    const contacts = readContacts();
    const contactID = parseInt(req.params.id,10);
    const updatedContact = req.body; // 获取请求体中的新联系人信息

    //查找
    const index = contacts.findIndex(contact => contact.id === contactID);
    if (index==-1){
        //没找到id
        return res.status(404).json({message:'要修改的联系人未找到'});
    }
    //信息合并,提交
    contacts[index] = {...contacts[index],...updatedContact};
    writeContacts(contacts);
    res.json(contacts[index]);
});


app.delete('/contacts/:id',(req,res)=>{
    const contacts = readContacts();
    const contactID = parseInt(req.params.id,10);
    const deletedContact = req.body;

    const index = contacts.findIndex(contact => contact.id === contactID);
    if(index==-1){
        return res.status(404).json({message:'要删除的联系人未找到'});
    }
    contacts.splice(index,1);
    writeContacts(contacts);
    res.json({message:'联系人已删除'});
});

app.listen(port,()=>{
    console.log(`服务器运行在 http://localhost:${port}`)
});