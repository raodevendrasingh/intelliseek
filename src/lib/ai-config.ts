import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

export const OPENAI_MODEL = "text-embedding-3-small";

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
}

if (!process.env.PINECONE_API_KEY || !process.env.PINECONE_INDEX_NAME) {
    throw new Error("Missing Pinecone configuration");
}

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

export const index = pc.index(
    process.env.PINECONE_INDEX_NAME,
    process.env.PINECONE_INDEX_HOST,
);
