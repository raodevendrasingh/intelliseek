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

export const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

export const index = pinecone.index(process.env.PINECONE_INDEX_NAME);
