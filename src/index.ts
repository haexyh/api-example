import express from "express";
import {Food} from "./Dto/food";

const app = express();
const port = 8080; // default port to listen

let foods = new Array<Food>();
foods.push(new Food(21, "banane", 2.50));
foods.push(new Food(23, "bratwurst", 6.70));
foods.push(new Food(11, "pommes", 5.00));
foods.push(new Food(1, "suppe", 7.00));

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("<h1>Hello API</h1>");
});

// start the Express server
app.listen(port, () => {
    // console.log( `server started at http://localhost:${ port }` );
});

app.post("/food", (req, res) => {
    const item: Food = req.body;
    const count = foods.length;
    if(item.id === 0 || foods.filter(i => i.id === item.id).length > 0)
    {
        res.status(400)
        return;
    }
    foods.push(item);
    if(count -1 === foods.length) res.status(200);
    else res.status(500);
    res.send(foods.find(i => i.id === item.id));
});

app.get("/food", (req, res) => {
    res.send(foods);
});

app.get("/food/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const item  = foods.find(i => i.id === id);
    if(item != null) res.status(200)
    else res.status(404)
    res.send(item);
});

app.put("/food/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const item: Food = req.body;
    foods = foods.filter(i => i.id);
    foods.push(item);
    if(foods.find(i => i.id === item.id) != null) res.status(200);
    else res.status(500);
});

app.delete("/food/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const count = foods.length;
    foods = foods.filter(i => i.id !== id) ;
    if(foods.length + 1 === foods.length) res.status(200);
    else res.status(404);
});
