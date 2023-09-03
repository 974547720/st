const Koa = require("koa");
const Router = require("koa-router");
const swaggerUI = require("koa2-swagger-ui").koaSwagger;
const swaggerSpec = require("./swagger");
const userRouters = require("./routes/users");

const app = new Koa();
const router = new Router();

router.use("/api", userRouters.routes(), userRouters.allowedMethods());

router.get(
  "/swagger",
  swaggerUI({
    routePrefix: false,
    swaggerOptions: {
      spec: swaggerSpec,
    },
  })
);

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
