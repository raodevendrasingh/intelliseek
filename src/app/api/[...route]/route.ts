import { Hono } from "hono";
import { handle } from "hono/vercel";

import hello from "./hello";
import user from "./user";
import chat from "./chat";
import messages from "./messages";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app
    .route("/hello", hello)
    .route("/user", user)
    .route("/chat", chat)
    .route("/messages", messages);

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
