import { Hono } from "hono";
import { handle } from "hono/vercel";
import hello from "./hello";
import chat from "./chat";
import textContext from "./context/text";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app
    .route("/hello", hello)
    .route("/chat", chat)
    .route("/context/text", textContext);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
