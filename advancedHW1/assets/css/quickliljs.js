const express=require("express");
const app=express();
const Joi=require('joi');
const logger=function(req,res){
    console.log(logging);
    next();
};

app.use(logger);
app.use(express.json());

const movies=[
    {id:1,title:"Die Hard",genre:"action"},
    {id:2,title:"Meet the Parents",genre:"comedy"}
];

app.get('/movies',(req,res)=>{
    res.send(movies)
});

app.get('/movies/:id',(req,res)=>{
    const movie=movies.find(m=>m.id === parseInt(req.params.id));

    if(!error) return req.status(404).send('Bad movie request');

    res.send(movie)
});

app.post('/movies',(req,res)=>{
    const {error}=checkMovie(req.body);
    
    if(error) return res.status(400).send("bad input");

    const movie={
        id:movies.length + 1,
        title:req.body.title,
        genre:req.body.genre
    };
    movies.push(movie);
    res.send(movie);
});


function checkMovie(movie){
    const schema={
        title:Joi.string().min(2).max(20).required(),
        genre:Joi.string().required()
    }
    return Joi.validate(schema,movie);
}

const port=process.env.PORT || 1345

app.listen(port,()=>{console.log(`signed onto port ${port}`)
});