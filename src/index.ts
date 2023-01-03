import "dotenv/config";
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get all posts
app.get("/posts", async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        res.json({ posts });
    } catch (error: any) {
        next(error.message);
    }
});

// create a post
app.post("/posts", async (req, res, next) => {
    try {
        const post = await prisma.post.create({
            data: {
                authorId: 1, ...req.body
            }
        });

        res.json({ post });
    } catch (error: any) {
        next(error.message);
    }
});

// get post by id
app.get("/posts/:id", async (req, res, next) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        
        res.json({ post });
    } catch (error: any) {
        next(error.message);
    }
});

// update a post
app.patch("/posts/:id", async (req, res, next) => {
    try {
        const post = await prisma.post.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: req.body,
        })

        res.json({ post });
    } catch (error: any) {
        next(error.message);
    }
});

// delete a post
app.delete("/posts/:id", async (req, res, next) => {
    try {
        await prisma.post.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
    } catch (error: any) {
        next(error.message);
    }
});

// get a user's posts
app.get("/users/:id/posts", async (req, res, next) => {
    try {
        const userWithPosts = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                posts: {
                    where: {
                        published: true,
                    },
                },
            }
        });

        const posts = userWithPosts?.posts;
        res.json({ posts });
    } catch (error: any) {
        next(error.message);
    }
});

app.listen(3000, () => {
    console.log('app listening on port 3000');
})