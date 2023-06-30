import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

/**
 * GET function to fetch prompts from database based on the creator's id.
 *
 * @param {object} request - The incoming request object.
 * @param {object} context - An object that contains additional HTTP parameters.
 * @param {object} context.params - An object that contains route parameters.
 * @param {string} context.params.id - The id of the creator.
 *
 * @returns {Response} - The response object that includes a list of prompts
 * in case of success, or an error message in case of failure.
 *
 * @throws Will throw an error if the database operation fails.
 */
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
