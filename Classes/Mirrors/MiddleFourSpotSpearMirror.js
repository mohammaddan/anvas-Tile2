import BaseMirror from "./BaseMirror.js";
import UpperSpear from "../Primitives/UpperSpear.js";
import BottomSpear from "../Primitives/BottomSpear.js";
import Lozenge from "../Primitives/Lozenge.js";
import UpperTriangle from "../Primitives/UpperTriangle.js";

export default class MiddleFourSpotSpearMirror extends BaseMirror {
    constructor(ctx, width, height, params, padding = 0) {
        super(ctx, width, height);

        this.spearWidth = this.lozengeHeight = this.lozengeWidth = width / params.countX;
        this.halfSpearHeight = (height - this.lozengeHeight) / 2
        this.drawer.addOneRowOfShapes(0, 0, new UpperSpear(this.lozengeWidth, this.halfSpearHeight, padding), params.countX);
        this.addGridOfLozenge(this.halfSpearHeight - this.lozengeHeight / 2, this.lozengeWidth, this.lozengeHeight, params.countX, 2, padding);
        this.drawer.addOneRowOfShapes(0, this.height - this.halfSpearHeight + this.lozengeHeight / 2, new BottomSpear(this.lozengeWidth, this.halfSpearHeight, padding), params.countX);
    }


    static parameters(width, height) {
        return [{
            name: 'countX',
            required: true,
            label: 'تعداد تکرار در عرض',
            default: Math.round(width / 25),
            min: Math.ceil(width / 50),
            max: Math.floor(width / 10)
        }, ]
    }

    drawMeasures(ctx, params, size) {
        let loz = new Lozenge(this.lozengeWidth, this.lozengeHeight);
        loz.drawMeasures(ctx, 50.5, 80.5, (params.countX * 3 - 2), 80)
        let hf = new UpperTriangle(this.lozengeWidth, this.lozengeHeight / 2, this.padding)
        hf.drawMeasures(ctx, 50.5, 180.5, 4, 80)
        let spear = new UpperSpear(this.lozengeWidth, this.halfSpearHeight, this.padding)
        spear.drawMeasures(ctx, 230.5, 50.5, params.countX * 2, 55)
    }

}