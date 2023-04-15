const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();

const prisma = new PrismaClient();

//계정 생성
router.post("/", async (req, res) => {
  try {
    const { account } = req.body;

    const existAccount = await prisma.user.findUnique({
      where: {
        account,
      },
    });

    if (existAccount) {
      return res.status(400).json({
        ok: false,
        error: "This account is already existed",
      });
    }

    const newAccount = await prisma.user.create({
      data: {
        account,
      },
    });

    res.json({ ok: true, account: newAccount });
  } catch (error) {
    console.error(error);
  }
});

//계정 조회
router.get("/:account", async (req, res) => {
  try {
    const { account } = req.params;

    const existAccount = await prisma.user.findUnique({
      where: {
        account,
      },
    });

    if (!existAccount) {
      return res
        .status(400)
        .json({ ok: false, error: "This account is not existed" });
    }

    const getAccount = await prisma.user.findUnique({
      where: {
        account,
      },
    });

    res.json({ ok: true, account: getAccount });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
