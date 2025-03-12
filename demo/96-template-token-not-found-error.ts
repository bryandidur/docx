// Patch a document with patches

import * as fs from "fs";
import { patchDocument, PatchType, TextRun } from "docx";

patchDocument({
    outputType: "nodebuffer",
    data: fs.readFileSync("demo/assets/token-not-found-template.docx"),
    patches: {
        locador_cpf: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun({ text: '123456789' })],
        },

        locatario_cpf: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun({ text: "987654321" })],
        },
    },
}).then((doc) => {
    console.log({doc})
    fs.writeFileSync("My Document.docx", doc);
}).catch((error) => {
    console.log({error})
});
