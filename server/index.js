const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = '5000';
const HOST = '127.0.0.1';

const AuthRoutes = require('./routes/auth');
const AdminRoutes = require('./routes/admin');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", AuthRoutes);
app.use("/admin", AdminRoutes);

app.listen(PORT, HOST, () => {
    console.log(`app listening on http://${HOST}:${PORT}`);
})
