import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


// const pdfUrl = "https://unique-dog-341.convex.cloud/api/storage/70bd8025-f1cc-447f-827b-33c37634ec13";

export async function GET(request) {

    const reqUrl = request.url;
    const { searchParams } = new URL(reqUrl);
    const pdfUrl = searchParams.get("pdfUrl");
    console.log("pdfUrl", pdfUrl);

    try {
        // 1. Load the PDF File

        const response = await fetch(pdfUrl);
        const data = await response.blob();
        const loader = new WebPDFLoader(data);
        const docs = await loader.load();

        let pdfTextContent = "";
        docs.forEach((doc) => {
            pdfTextContent += doc.pageContent;
        });

        // 2. Split the PDF Text Content into Chunks

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 100,
            chunkOverlap: 20,
        });

        const output = await splitter.createDocuments([pdfTextContent]);

        let splitterList = [];

        output.forEach((doc) => {
            splitterList.push(doc.pageContent);
        });

        return NextResponse.json({ result: splitterList });
    }
    catch (error) {
        console.error("Error loading PDF:", error);
        return NextResponse.json({ error: "Failed to load PDF" }, { status: 500 });
    }
}