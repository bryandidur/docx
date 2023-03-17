// tslint:disable:object-literal-key-quotes
import { expect } from "chai";
import { SinonStub, stub } from "sinon";

import * as convenienceFunctions from "@util/convenience-functions";

import { Media } from "./media";

describe("Media", () => {
    before(() => {
        stub(convenienceFunctions, "uniqueId").callsFake(() => "test");
    });

    after(() => {
        (convenienceFunctions.uniqueId as SinonStub).restore();
    });

    describe("#Array", () => {
        it("Get images as array", () => {
            const media = new Media();

            media.addImage("test2.png", {
                stream: Buffer.from(""),
                fileName: "test2.png",
                transformation: {
                    pixels: {
                        x: Math.round(1),
                        y: Math.round(1),
                    },
                    emus: {
                        x: Math.round(1 * 9525),
                        y: Math.round(1 * 9525),
                    },
                },
            });

            const array = media.Array;
            expect(array).to.be.an.instanceof(Array);
            expect(array.length).to.equal(1);

            const image = array[0];
            expect(image.fileName).to.equal("test.png");
            expect(image.transformation).to.deep.equal({
                pixels: {
                    x: 100,
                    y: 100,
                },
                flip: {
                    vertical: true,
                    horizontal: true,
                },
                emus: {
                    x: 952500,
                    y: 952500,
                },
                rotation: 5400000,
            });
        });
    });
});
