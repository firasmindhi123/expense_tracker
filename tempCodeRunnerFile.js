
user.hasMany(Forgotpassword);
Forgotpassword.belongsTo(user);

user.hasMany(file_download);
file_download.belongsTo(user);

sequelize.sync().then(result=>{
   
    app.listen(4000)
} ).catch(err=>console.log(err))