const express = require('express')
const path = require('path')
const { PythonShell } = require('python-shell')

const app = express()
// initialize the body parser for ajax calls
app.use(express.json({ extented: false }))
// initialize body parser for normal logging in and signing in 
app.use(express.urlencoded({ extended: false }))

// setting the static folder
app.use(express.static(path.join(__dirname, '/public')))

let options = {
    mode: 'text',
    encoding: 'utf8',
    pythonPath: '/usr/bin/python3',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: './scripts/',
    args: []
}

// server the main index file
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, './public/html/index.html'))
)

// get the question.
app.post('/query', (req, res) => {
    // empty the arguments array to remove the previous question 
    options.args = []
    options.args.push(req.body.data)
    // calling the python file here.
    PythonShell.run('main.py', options, (err, result) => {
        if (err) {
            res.send('there was an error')
            throw err
        }
        res.send(result[0])
    });
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))