let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let db = require("./models");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(methodOverride("_method"));


app.get('/', (req, res) => {

    res.render('index');
})


app.get('/search', (req, res) => {
    let monthStart = req.query.monthStart;
    let monthEnd = req.query.monthEnd;

    console.log(monthStart + "From get");
    console.log(monthEnd + "From get");

    let query = "EXEC upZDO_TEST1"
    query = query + "'" + "admin" +"', "
    query = query + "'" + "EXCEL" + "', "
    query = query + "'" + "LIST" + "', "
    query = query + "'" + monthStart + "', "
    query = query + "'" + monthEnd + "', "
    query = query + "'" + "" + "'"
    
    
    db.sequelize.query(query).then(Diff => res.json(Diff[1][0].SALES_DOC));
    // db.sequelize.query(query).then(Diff => res.json(Diff[1][0].SALES_DOC));

});



db.sequelize.sync().then(()=>
app.listen(process.env.PORT || 3001, ()=> {
    console.log("you are on port 3001")
})
)