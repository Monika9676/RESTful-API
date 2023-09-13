const express=require('express');
const app=express();
const port=8080;
const path=require('path');
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,'public')));

let posts=[
    {
        id:uuidv4(),
        username:"CodeInspirer",
        content:"Coding isn't just about instructions; it's about creating possibilities.💻",
        image:"https://i.pinimg.com/564x/78/a0/d7/78a0d740924810464741e4561452d091.jpg"
    },
    {
        id:uuidv4(),
        username:"CodeJokerPro",
        content:"When you spend hours debugging, and the error message is just laughing at you.",
        image:"https://assets-global.website-files.com/5f3c19f18169b62a0d0bf387/60d33be8cf4ba7565123c8bc_YPD3ulQQAGQpOcnqIm3QzSTRgzmr1SexpW9ZjMpJ1mAnUxx4iF05XOTu44sk0qQG-8XgBcYmGZGAD-5SAZvJl3TjtmhgWnn-w0C2XKwhBscV78RVvhwZfyp0v_Pa6sNj5zxpOvRW.png"
    }
]
//main page
app.get('/posts',(req,res)=>{
      res.render('index.ejs',{ posts });
});
//create new post
app.get('/posts/new',(req,res)=>{
    res.render('new.ejs',{ posts });
});
//back after adding
app.post('/posts',(req,res)=>{
    //console.log(req.body);
    let id=uuidv4();
    let {image,username,content}=req.body;
    posts.push({id,image,username,content});
    //res.send("Post req working");
    res.redirect('/posts');
});
//show in detail
app.get('/posts/:id',(req,res)=>{
    let { id }=req.params;
    let post=posts.find((p)=>id===p.id);
    //console.log(id);
    console.log(post);
    //res.send("post is showing")
    res.render('show.ejs',{ post });
});
//edit post
app.get('/posts/:id/edit',(req,res)=>{
    let { id }=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render('edit.ejs',{ post });
});
//patch request-update post after editing
app.patch('/posts/:id',(req,res)=>{
    let { id }=req.params;
    let post=posts.find((p)=>id===p.id);
    let newContent=req.body.content;
    post.content=newContent;
    res.redirect('/posts');
});
//to delete
app.delete("/posts/:id",(req,res)=>{
    let { id }=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
})
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})