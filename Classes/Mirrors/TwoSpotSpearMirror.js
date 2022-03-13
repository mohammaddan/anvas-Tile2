import BottomTriangle from "../Primitives/BottomTriangle.js";
import UpperTriangle from "../Primitives/UpperTriangle.js";
import BaseMirror from "./BaseMirror.js";
import Spear from "../Primitives/Spear.js";
import Lozenge from "../Primitives/Lozenge.js";
import Blade from "../Primitives/Blade.js";

export default class TwoSpotSpearMirror extends BaseMirror {
    constructor(ctx, width, height, params, padding = 0) {
        super(ctx, width, height);

        this.spearWidth = this.lozengeHeight = this.lozengeWidth = width / params.countX;
        this.spearHeight = height - this.lozengeHeight * 2;
        this.drawer.addOneRowOfShapes(0, 0, new UpperTriangle(this.lozengeWidth, this.lozengeHeight / 2, padding), params.countX);
        this.addGridOfLozenge(0, this.lozengeWidth, this.lozengeHeight, params.countX, 1, padding);
        this.drawer.addOneRowOfShapes(0, this.lozengeHeight, new Lozenge(this.lozengeWidth, this.lozengeHeight, padding), params.countX);
        this.drawer.addOneShapeAt(0, this.lozengeHeight, new Blade(this.spearWidth / 2, this.spearHeight, padding, 1, 'left'))
        this.drawer.addOneRowOfShapes(this.lozengeWidth / 2, this.lozengeHeight * 1.5, new Spear(this.spearWidth, this.spearHeight, padding), params.countX - 1);
        this.drawer.addOneShapeAt(width - this.spearWidth / 2, this.lozengeHeight * 1.5, new Blade(this.spearWidth / 2, this.spearHeight, padding, 1, 'right'))
        this.drawer.addOneRowOfShapes(0, this.lozengeHeight + this.spearHeight, new Lozenge(this.lozengeWidth, this.lozengeHeight, padding), params.countX);
        this.addGridOfLozenge(this.spearHeight + this.lozengeHeight, this.lozengeWidth, this.lozengeHeight, params.countX, 1, padding);
        this.drawer.addOneRowOfShapes(0, height - this.lozengeHeight / 2, new BottomTriangle(this.lozengeWidth, this.lozengeHeight / 2, padding), params.countX);
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
        loz.drawMeasures(ctx, 170.5, 80.5, (params.countX * 2 - 1) * 2, 80)
        let hf = new UpperTriangle(this.lozengeWidth, this.lozengeHeight / 2, this.padding)
        hf.drawMeasures(ctx, 170.5, 220.5, params.countX * 2 + 4, 80)
        let spear = new Spear(this.spearWidth, this.spearHeight, this.padding)
        spear.drawMeasures(ctx, 50.5, 50.5, params.countX - 1, 50)
        let blade = new Blade(this.spearWidth / 2, this.spearHeight, this.padding, 1, 'left')
        blade.drawMeasures(ctx, 300.5, 30.5, 2, 25)
    }

}