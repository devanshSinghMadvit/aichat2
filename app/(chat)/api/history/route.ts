
import { getChatsByUserId } from '@/lib/db/queries';

export async function GET() {
  const session = {user:{id:"assad",exipres:"33342442424342424",email:"test@yopmail.com"}};


  if (!session || !session.user) {
    return Response.json('Unauthorized!', { status: 401 });
  }

  // biome-ignore lint: Forbidden non-null assertion.
  const chats = await getChatsByUserId({ id: session.user.id! });
  return Response.json(chats);
}
