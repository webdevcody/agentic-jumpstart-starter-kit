import { c as createServerRpc } from "./createServerRpc-D_-6bKnO.js";
import { z } from "zod";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, DeleteObjectCommand, HeadObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { h as database, u as user } from "./auth-BWkAJVqq.js";
import { a as authenticatedMiddleware } from "./middleware-BDm4WWFo.js";
import { eq } from "drizzle-orm";
import { c as createServerFn } from "../server.js";
import "node:crypto";
import "node:fs";
import "node:fs/promises";
import "node:os";
import "node:path";
import "drizzle-orm/pg-core";
import "drizzle-orm/node-postgres";
import "pg";
import "node:async_hooks";
import "node:stream";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
class R2Storage {
  client;
  bucket;
  constructor() {
    {
      throw new Error(
        "R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_BUCKET must be set"
      );
    }
  }
  async upload(key, data, contentType = "application/octet-stream") {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: data,
      ContentType: contentType
    });
    await this.client.send(command);
  }
  async delete(key) {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key
      })
    );
  }
  async exists(key) {
    try {
      await this.client.send(
        new HeadObjectCommand({
          Bucket: this.bucket,
          Key: key
        })
      );
      return true;
    } catch (error) {
      if (error.name === "NotFound" || error.$metadata?.httpStatusCode === 404) {
        return false;
      }
      throw error;
    }
  }
  async getStream(_key, _rangeHeader) {
    throw new Error(
      "getStream is not supported for R2. Use getPresignedUrl instead."
    );
  }
  async getPresignedUrl(key) {
    return await getSignedUrl(
      this.client,
      new GetObjectCommand({
        Bucket: this.bucket,
        Key: key
      }),
      { expiresIn: 60 * 60 }
      // 1 hour
    );
  }
  async getPresignedUploadUrl(key, contentType = "application/octet-stream") {
    console.log("Generating presigned URL for:", {
      key,
      contentType,
      bucket: this.bucket
    });
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType
    });
    const presignedUrl = await getSignedUrl(
      this.client,
      command,
      { expiresIn: 60 * 60 }
      // 1 hour
    );
    console.log("Generated presigned URL:", presignedUrl);
    return presignedUrl;
  }
}
let storage = null;
function getStorage() {
  if (!storage) {
    storage = new R2Storage();
  }
  return { storage, type: "r2" };
}
const getPresignedUploadUrlFn_createServerFn_handler = createServerRpc({
  id: "610332affe54dce49d2c5b3553feab913e268a25da2886ff8cc7a38f049aeaf7",
  name: "getPresignedUploadUrlFn",
  filename: "src/fn/storage.ts"
}, (opts) => getPresignedUploadUrlFn.__executeServer(opts));
const getPresignedUploadUrlFn = createServerFn({
  method: "POST"
}).middleware([authenticatedMiddleware]).inputValidator(z.object({
  videoKey: z.string()
})).handler(getPresignedUploadUrlFn_createServerFn_handler, async ({
  data
}) => {
  const {
    storage: storage2
  } = getStorage();
  const presignedUrl = await storage2.getPresignedUploadUrl(data.videoKey);
  return {
    presignedUrl,
    videoKey: data.videoKey
  };
});
const getPresignedImageUploadUrlFn_createServerFn_handler = createServerRpc({
  id: "d9234728733cefe7b317868901f873f31d66d20f89e6e5978706c16dd0d7cd6f",
  name: "getPresignedImageUploadUrlFn",
  filename: "src/fn/storage.ts"
}, (opts) => getPresignedImageUploadUrlFn.__executeServer(opts));
const getPresignedImageUploadUrlFn = createServerFn({
  method: "POST"
}).middleware([authenticatedMiddleware]).inputValidator(z.object({
  imageKey: z.string()
})).handler(getPresignedImageUploadUrlFn_createServerFn_handler, async ({
  data
}) => {
  const {
    storage: storage2
  } = getStorage();
  const presignedUrl = await storage2.getPresignedUploadUrl(data.imageKey);
  return {
    presignedUrl,
    imageKey: data.imageKey
  };
});
const getImageUrlFn_createServerFn_handler = createServerRpc({
  id: "2df6b4342eedb937bf3d92cfe05ebd5a833d112f86c005def30fa8cc336984c7",
  name: "getImageUrlFn",
  filename: "src/fn/storage.ts"
}, (opts) => getImageUrlFn.__executeServer(opts));
const getImageUrlFn = createServerFn({
  method: "POST"
}).inputValidator(z.object({
  imageKey: z.string()
})).handler(getImageUrlFn_createServerFn_handler, async ({
  data
}) => {
  const {
    storage: storage2
  } = getStorage();
  const imageUrl = await storage2.getPresignedUrl(data.imageKey);
  return {
    imageUrl
  };
});
const updateUserProfileFn_createServerFn_handler = createServerRpc({
  id: "1532c05db466ba1b1bc583dee69628bf12ef40c1a2afa5eb87dedd956ac18a00",
  name: "updateUserProfileFn",
  filename: "src/fn/storage.ts"
}, (opts) => updateUserProfileFn.__executeServer(opts));
const updateUserProfileFn = createServerFn({
  method: "POST"
}).middleware([authenticatedMiddleware]).inputValidator(z.object({
  name: z.string().optional(),
  image: z.string().optional()
})).handler(updateUserProfileFn_createServerFn_handler, async ({
  data,
  context
}) => {
  const userId = context.userId;
  const updateData = {
    updatedAt: /* @__PURE__ */ new Date()
  };
  if (data.name !== void 0) {
    updateData.name = data.name;
  }
  if (data.image !== void 0) {
    updateData.image = data.image;
  }
  await database.update(user).set(updateData).where(eq(user.id, userId));
  return {
    success: true
  };
});
const getProfileImageUploadUrlFn_createServerFn_handler = createServerRpc({
  id: "707390cd9bacb8ad9b94538edd1c8ad6d55bed8171a8659e68e98c1997e4071a",
  name: "getProfileImageUploadUrlFn",
  filename: "src/fn/storage.ts"
}, (opts) => getProfileImageUploadUrlFn.__executeServer(opts));
const getProfileImageUploadUrlFn = createServerFn({
  method: "POST"
}).middleware([authenticatedMiddleware]).inputValidator(z.object({
  fileName: z.string(),
  contentType: z.string()
})).handler(getProfileImageUploadUrlFn_createServerFn_handler, async ({
  data,
  context
}) => {
  const userId = context.userId;
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const fileExtension = data.fileName.split(".").pop() || "";
  const imageKey = `profile-images/${userId}/${Date.now()}.${fileExtension}`;
  const {
    storage: storage2
  } = getStorage();
  const presignedUrl = await storage2.getPresignedUploadUrl(imageKey, data.contentType);
  return {
    presignedUrl,
    imageKey
  };
});
const deleteUserAccountFn_createServerFn_handler = createServerRpc({
  id: "af7ddf1ac8af1852cae9847fc884ab80bf328b5a4f8ff5bc6b044f5dc5f55549",
  name: "deleteUserAccountFn",
  filename: "src/fn/storage.ts"
}, (opts) => deleteUserAccountFn.__executeServer(opts));
const deleteUserAccountFn = createServerFn({
  method: "POST"
}).middleware([authenticatedMiddleware]).inputValidator(z.object({
  email: z.string().email()
})).handler(deleteUserAccountFn_createServerFn_handler, async ({
  data,
  context
}) => {
  const userId = context.userId;
  const [userRecord] = await database.select().from(user).where(eq(user.id, userId)).limit(1);
  if (!userRecord) {
    throw new Error("User not found");
  }
  if (userRecord.email.toLowerCase() !== data.email.toLowerCase()) {
    throw new Error("Email does not match your account email");
  }
  await database.delete(user).where(eq(user.id, userId));
  return {
    success: true
  };
});
export {
  deleteUserAccountFn_createServerFn_handler,
  getImageUrlFn_createServerFn_handler,
  getPresignedImageUploadUrlFn_createServerFn_handler,
  getPresignedUploadUrlFn_createServerFn_handler,
  getProfileImageUploadUrlFn_createServerFn_handler,
  updateUserProfileFn_createServerFn_handler
};
