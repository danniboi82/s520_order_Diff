let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let db = require("./models");
let currentDate = require('./public/javascript/currentDate');
let paginate = require('express-paginate');

app.use(paginate.middleware(10, 50));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(methodOverride("_method"));

console.log(currentDate.currentDate());
app.get('/', (req, res) => {
let monthStart = currentDate.currentDate();
let monthEnd  = currentDate.currentDate();

let query = "EXEC upZDO_TEST1"
query = query + "'" + "admin" + "', "
query = query + "'" + "EXCEL" + "', "
query = query + "'" + "LIST" + "', "
query = query + "'" + monthStart + "', "
query = query + "'" + monthEnd + "', "
query = query + "'" + "" + "'"

db.sequelize.query(query, {limit: req.query.limit, offset: req.skip}).then(Diff => {
    let table = Diff[0];
    let itemCount = table.length;
    let pageCount = Math.ceil(table.count / req.query.limit)
    console.log(table.length)
    res.render('index', {
        table: table,
        pageCount,
        itemCount,
        pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
    })
});
})


app.get('/search', (req, res) => {
    let monthStart = req.query.monthStart;
    let monthEnd = req.query.monthEnd;

    console.log(monthStart + "From get");
    console.log(monthEnd + "From get");

    let query = "EXEC upZDO_TEST1"
    query = query + "'" + "admin" + "', "
    query = query + "'" + "EXCEL" + "', "
    query = query + "'" + "LIST" + "', "
    query = query + "'" + monthStart + "', "
    query = query + "'" + monthEnd + "', "
    query = query + "'" + "" + "'"


    db.sequelize.query(query).then(Diff => {
        let table = Diff[0];
        console.log(table.length)
        res.render('index', {
            table: table
        })
    });
    // db.sequelize.query(query).then(Diff => res.json(Diff[1][0].SALES_DOC));

});

app.get('/testing', (req, res)=>{
    res.render('test');
})


db.sequelize.sync().then(() =>
    app.listen(process.env.PORT || 3001, () => {
        console.log("you are on port 3001")
    })
)