import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { extractDiff } from "../../../lib/diffUtils";
import {
  getVersions,
  saveVersion,
  getLastText,
  updateLastTextInEntry
} from "../../../lib/storage";

export async function POST(req) {
  try {
    const { newText } = await req.json();

    const lastText = getLastText();
    const { added, removed } = extractDiff(lastText, newText);

    const entry = {
      id: uuid(),
      timestamp: new Date().toLocaleString(),
      addedWords: added,
      removedWords: removed,
      oldLength: lastText.length,
      newLength: newText.length,
      finalText: newText
    };

    saveVersion(entry);

    return NextResponse.json({ message: "Version saved", entry });
  } catch (error) {
    console.error("Error in /save-version:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
   


// ❌ GET is not allowed for this route
export function GET() {
  return NextResponse.json(
    { error: "Use POST to save version" },
    { status: 405 }
  );
}
