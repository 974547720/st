const Router = require("koa-router");
const router = new Router();

/**
 * @swagger
 * tags:
 *      name:Users
 *      description:User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID.
 *         name:
 *           type: string
 *           description: The user's name.
 *         email:
 *           type: string
 *           description: The user's email.
 *       required:
 *         - id
 *         - name
 *         - email
 */

/**
 * @swagger
 * /users:
 *      get:
 *          summary: Retrieve a list of users
 *          tags: [Users]
 *          responses:
 *              200:
 *                  description: A list of users.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/User'
 */

router.get("/users", async (ctx) => {
  const users = [
    {
      id: 1,
      name: "st",
      email: "110120119@qq.com",
    },
    {
      id: 2,
      name: "shutao",
      email: "111111111@qq.com",
    },
  ];
  ctx.body = users;
});

module.exports = router;
