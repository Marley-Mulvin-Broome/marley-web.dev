import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { sendDiscordWebhook } from "$lib/discord";
import { env } from "$env/dynamic/private";
import type { ContactBody } from "$lib/types";

export const POST: RequestHandler = async ({ request }) => {
  const { name, email, message } = (await request.json()) as ContactBody;
  

  if (!name || !email || !message) error(400);

  try {
    const result = await sendDiscordWebhook(env.WEBHOOK_LINK, 
      `# Contact from ${name}\n
      
      email: ${email}
      message: 
        \`\`\`
${message}
        \`\`\`
      `
    )
    
    if (!result.ok) throw new Error(); 
  } catch (e) {
    console.error(e)
    error(500);
  }

  return new Response();
};