const express = require("express");
const { PrismaClient } = require("@prisma/client");
const e = require("express");

const router = express.Router();

const prisma = new PrismaClient();

//투두 생성
router.post("/", async (req, res) => {
  try {
    const { todo, userId } = req.body;

    if (!todo) {
      return res
        .status(400)
        .json({ ok: false, error: "Please input your Todo" });
    }

    if (!userId) {
      return res
        .status(400)
        .json({ ok: false, error: "Please select any userId" });
    }

    const existUserId = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!existUserId) {
      return res.status(400).json({
        ok: false,
        error: "Not existed userId",
      });
    }

    const newTodo = await prisma.todo.create({
      data: {
        todo,
        isDone: false,
        userId: parseInt(userId),
      },
    });

    res.json({ ok: true, todo: newTodo });
  } catch (error) {
    console.error(error);
  }
});

//투두 조회
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { skip } = req.query;

    if (!userId) {
      return res.status(400).json({
        ok: false,
        error: "Not existed userId",
      });
    }

    const todos = await prisma.todo.findMany({
      where: {
        userId: parseInt(userId),
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: parseInt(skip),
      take: 5,
    });

    res.json({ ok: true, todos });
  } catch (error) {
    console.error(error);
  }
});

//투두 완료
router.put("/:id/done", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const existTodo = await prisma.todo.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existTodo) {
      return res.status(400).json({ ok: false, error: "Not existed todo" });
    }

    if (existTodo.userId !== parseInt(userId)) {
      return res
        .status(400)
        .json({ ok: false, error: "You can only update your own Todo." });
    }

    const updateTodo = await prisma.todo.update({
      where: {
        id: parseInt(id),
      },
      data: {
        isDone: !existTodo.isDone,
      },
    });

    res.json({ ok: true, todo: updateTodo });
  } catch (error) {
    console.error(error);
  }
});

//투두 삭제
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const existTodo = await prisma.todo.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existTodo) {
      return res
        .status(400)
        .json({ ok: false, error: "This todo is not existed" });
    }

    if (existTodo.userId !== parseInt(userId)) {
      return res.status(400).json({
        ok: false,
        error: "You can only delete your own Todo.",
      });
    }

    const deleteTodo = await prisma.todo.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({ ok: true, todo: deleteTodo });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
