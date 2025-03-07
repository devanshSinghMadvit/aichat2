import { NextRequest, NextResponse } from "next/server";
import { auth, getDriveClient } from "@/lib/auth";

type DriveItem = {
  id: string;
  name: string;
  mimeType: string;
  children?: DriveItem[];
};

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const drive = await getDriveClient(session.accessToken);

  async function getFolderContents(folderId: string = "root"): Promise<DriveItem[]> {
    const items: DriveItem[] = [];
    
    try {
      const response = await drive.files.list({
        q: `'${folderId}' in parents`,
        fields: "files(id, name, mimeType)",
      });

      const files = response.data.files || [];
      
      for (const file of files) {
        const item: DriveItem = {
          id: file.id!,
          name: file.name!,
          mimeType: file.mimeType!,
        };

        if (file.mimeType === "application/vnd.google-apps.folder") {
          item.children = await getFolderContents(file.id!);
        }
        
        items.push(item);
      }
    } catch (error) {
      console.error("Error fetching Drive contents:", error);
    }

    return items;
  }

  const hierarchy = await getFolderContents();
  return NextResponse.json(hierarchy);
}