import { connectDB } from "@/utils/database";
import Prompt from "@/models/prompt";

// Get Prompt Req
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt)
      return new Response(JSON.stringify("Prompt not found"), { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

// Update Prompt Req
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectDB();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found.", { status: 404 });
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// Delete Prompt Req

export const DELETE = async (request, { params }) => {
  try {
    await connectDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt Deleted Successfully.", { status: 200 });
  } catch (error) {
    return new Response("Failed to Deleted Successfully.", { status: 500 });
  }
};
