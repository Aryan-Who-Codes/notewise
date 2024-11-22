import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const AddFileEntryToDb = mutation({
  args: {
    fileId: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    createdBy: v.string(),
    fileUrl: v.string(),
  },
  handler: async (ctx, args) => {
    // Get file metadata using the recommended system table approach
    const storageData = await ctx.db.system.get(args.storageId);
    const fileSize = storageData?.size || 0;

    const result = await ctx.db.insert("pdfFiles", {
      fileId: args.fileId,
      storageId: args.storageId,
      fileName: args.fileName,
      fileUrl: args.fileUrl,
      createdBy: args.createdBy,
      fileSize: fileSize,
    });
    return {
      "message": "File Uploaded Successfully",
    }
  }
});

export const GetFileUrl = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    return url;
  }
});

export const GetFileRecord = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.query("pdfFiles").filter((q) => q.eq(q.field("fileId"), args.fileId)).collect();
    // console.log(result);
    return result[0];
  }
});

export const GetUserFiles = query({
  args: {
    userEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {

    if (!args?.userEmail) {
      return [];
    }

    const result = await ctx.db.query("pdfFiles").filter((q) => q.eq(q.field("createdBy"), args.userEmail)).collect();

    return result;
  }
});

// Add this to your existing fileStorage.js, keeping all other code

export const getUserStats = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    // Using the existing "pdfFiles" table from your codebase
    if (!args.email) {
      return {
        documentsCount: 0,
        storageUsed: 0,
        // lastActive: null
      };
    }

    const files = await ctx.db
      .query("pdfFiles")
      .filter(q => q.eq(q.field("createdBy"), args.email))
      .collect();

    const totalSize = files.reduce((acc, file) => acc + (file.fileSize || 0), 0);

    // const lastActive = files.length > 0
    //   ? Math.max(...files.map(f => f._creationTime))
    //   : null;

    return {
      documentsCount: files.length,
      storageUsed: totalSize,
      // lastActive: user?.lastActive || null
    };
  }
});

