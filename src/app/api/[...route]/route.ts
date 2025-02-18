import { Hono } from "hono";
import { handle } from "hono/vercel";

import hello from "./hello";
import chat from "./chat";
import query from "./query";
import messages from "./messages";
import text from "./context/text";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app
    .route("/hello", hello)
    .route("/chat", chat)
    .route("/query", query)
    .route("/messages", messages)
    .route("/context/text", text);

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
