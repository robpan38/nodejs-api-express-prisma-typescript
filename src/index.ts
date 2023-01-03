import "dotenv/config";
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get all posts
app.get("/posts", async (req, res, next) => {

});

// create a post
app.post("/posts", async (req, res, next) => {

});

// get post by id
app.get("/posts/:id", async (req, res, next) => {

});

// update a post
app.patch("/posts/:id", async (req, res, next) => {

});

// delete a post
app.delete("/posts/:id", async (req, res, next) => {

});

// get a user's posts
app.get("/users/:id/posts", async (req, res, next) => {

});

app.listen(3000, () => {
    console.log('app listening on port 3000');
})