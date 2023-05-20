const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let myName = "";

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.get('/', (req, res) => {
    res.send(`
      <html>
        <body>
          <section>
            <h1>Hello friend, what is your name?</h1>
            <h2>My name is : ${myName}</h2>
          </section>
          <form action="/name" method="POST">
            <div class="form-control">
              <label>Your name is</label>
              <input type="text" name="name">
            </div>
            <button>Set your name</button>
          </form>
        </body>
      </html>
    `);
  });

  app.post('/name', (req, res) => {
    const userName = req.body.name;
    console.log(userName);
    myName = userName;
    res.redirect('/');
  });

  app.listen(418,()=>{
    console.log("The app is running on poet: 418...");
  });