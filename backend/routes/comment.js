const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();

const prisma = new PrismaClient();

//댓글 생성
router.post("/", async (req, res) => {
  try {
    const { comment, userId, todoId } = req.body;

    if (!comment) {
      return res
        .status(400)
        .json({ ok: false, error: "Please input any comment" });
    }

    if (!userId) {
      return res
        .status(400)
        .json({ ok: false, error: "Please select any userId" });
    }

    if (!todoId) {
      return res
        .status(400)
        .json({ ok: false, error: "Please select any todoId" });
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

    const existTodo = await prisma.todo.findUnique({
      where: {
        id: parseInt(todoId),
      },
    });

    if (!existTodo) {
      return res.status(400).json({ ok: false, error: "Not existed Todo" });
    }

    const newComment = await prisma.comment.create({
      data: {
        comment,
        userId: parseInt(userId),
        todoId: parseInt(todoId),
      },
    });

    res.json({ ok: true, comment: newComment });
  } catch (error) {
    console.error(error);
  }
});

//댓글 조회
router.get("/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;

    if (!todoId) {
      return res.status(400).json({ ok: false, error: "Not existed Todo" });
    }

    const getTodoId = await prisma.comment.findMany({
      where: {
        todoId: parseInt(todoId),
      },
    });

    res.json({ ok: true, comments: getTodoId });
  } catch (error) {
    console.error(error);
  }
});

//댓글 수정
router.put("/:id/revise", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, todoId, comment } = req.body;

    if (!comment) {
      return res
        .status(400)
        .json({ ok: false, error: "Please input any words" });
    }

    const existComment = await prisma.comment.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (existComment.userId !== parseInt(userId)) {
      return res
        .status(400)
        .json({ ok: false, error: "You can only update your own comment." });
    }

    if (existComment.todoId !== parseInt(todoId)) {
      return res
        .status(400)
        .json({ ok: false, error: "You can only update your own comment." });
    }

    const updateComment = await prisma.comment.update({
      where: {
        id: parseInt(id),
      },
      data: {
        comment,
      },
    });

    res.json({ ok: true, comment: updateComment });
  } catch (error) {
    console.error(error);
  }
});

//댓글 삭제
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, todoId, comment } = req.body;

    const existComment = await prisma.comment.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (existComment.userId !== parseInt(userId)) {
      return res
        .status(400)
        .json({ ok: false, error: "You can only delete your own comment." });
    }

    if (existComment.todoId !== parseInt(todoId)) {
      return res
        .status(400)
        .json({ ok: false, error: "You can only delete your own comment." });
    }

    const deleteComment = await prisma.comment.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({ ok: true, comment: deleteComment });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
