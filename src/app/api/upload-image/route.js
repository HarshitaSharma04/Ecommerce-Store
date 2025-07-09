import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("image");

  if (!file) {
    return NextResponse.json({ success: false, message: "No image provided" });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64String = `data:${file.type};base64,${buffer.toString("base64")}`;

  try {
    const result = await cloudinary.uploader.upload(base64String, {
      folder: "products", // ✅ Automatically creates this folder if not present
      public_id: Date.now().toString(), // optional: unique name
      resource_type: "image",
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: "Upload failed" });
  }
}
