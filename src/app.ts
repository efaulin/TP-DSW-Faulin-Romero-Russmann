import express from 'express'


const app = express()

app.use('/', (req, res) => {
    res.json({message: '<h1>Carlos el bastardo que mato a mi hermano</h1>'})
})

app.listen(3000, ()=> {
    console.log('Server up and running')
})