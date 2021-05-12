const express = require('express');
const socialRoutes = require('./routes/socialRoutes')

const app=express();

app.listen(3000);
app.set('view engine', 'ejs');

app.get('/',(req, res) => {
    res.render('index')
});

app.use('/api', socialRoutes);

app.use((req, res)=> {
    res.status(404).render('404');
});