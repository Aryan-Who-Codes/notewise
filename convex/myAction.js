import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    await ConvexVectorStore.fromTexts(
      args.splitText, // Array
      args.fileId, // String
      new GoogleGenerativeAIEmbeddings({
        apiKey: "AIzaSyBTrfv7Ml-NPP4pOJHV3uBBQQoYDuGz3ok",
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    return "Success";
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    // Don't proceed if query is empty
    if (!args.query.trim()) {
      return JSON.stringify([]);
    }

    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: "AIzaSyBTrfv7Ml-NPP4pOJHV3uBBQQoYDuGz3ok",
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx });

    const results = await vectorStore.similaritySearch(args.query, 1);
    // console.log("Vector search results:", results);

    // Fix the metadata comparison - join the characters to form the fileId
    const filteredResults = results.filter(doc => {
      const metadataFileId = Object.values(doc.metadata).join('');
      return metadataFileId === args.fileId;
    });
    // console.log("Filtered results:", filteredResults);

    return JSON.stringify(filteredResults);
  },
});