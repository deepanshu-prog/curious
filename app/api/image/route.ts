import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return new NextResponse("Replicate API Token not configured.", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }

    const [width, height] = resolution.split("x").map(Number);

    const images = [];
    const numImages = parseInt(amount, 10);

    for (let i = 0; i < numImages; i++) {
      const output = await replicate.run("black-forest-labs/flux-schnell", {
        input: {
          prompt,
          num_outputs: 1,
          aspect_ratio: width === height ? "1:1" : width > height ? "16:9" : "9:16",
        },
      });

      const urls = output as string[];
      if (urls && urls.length > 0) {
        images.push({ url: urls[0] });
      }
    }

    if (!isPro) {
      await incrementApiLimit();
    }

    return NextResponse.json(images);
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
