import BaseMirror from "./BaseMirror.js";
import UpperSpear from "../Primitives/UpperSpear.js";
import BottomSpear from "../Primitives/BottomSpear.js";
import Lozenge from "../Primitives/Lozenge.js";
import LeftTriangle from "../Primitives/LeftTriangle.js";

export default class NineSpotSpearMirror extends BaseMirror {
  constructor(ctx, width, height, params, padding = 0) {
    super(ctx, width, height);

    this.spearWidth = this.lozengeHeight = this.lozengeWidth = width / params.countX;
    this.halfSpearHeight = (height - 2 * this.lozengeHeight) / 2;
    this.drawer.addOneRowOfShapes(0, 0, new UpperSpear(this.lozengeWidth, this.halfSpearHeight, padding), params.countX);
    this.addGridOfLozenge(this.halfSpearHeight - this.lozengeHeight * 0.5, this.lozengeWidth, this.lozengeHeight, params.countX, 3, padding);
    this.drawer.addOneRowOfShapes(
      0,
      this.height - this.halfSpearHeight + this.lozengeHeight * 0.5,
      new BottomSpear(this.lozengeWidth, this.halfSpearHeight, padding),
      params.countX
    );
  }

  static parameters(width, height) {
    return [
      {
        name: "countX",
        required: true,
        label: "تعداد تکرار در عرض",
        default: Math.round(width / 25),
        min: Math.ceil(width / 50),
        max: Math.floor(width / 10),
      },
    ];
  }

  drawMeasures(ctx, params, size = 0.8) {
    let loz = new Lozenge(this.lozengeWidth, this.lozengeHeight);
    loz.drawMeasures(ctx, 50.5, 80.5, params.countX * 5 - 3, 80 * size);
    let hf = new LeftTriangle(this.lozengeWidth/2, this.lozengeHeight, this.padding);
    hf.drawMeasures(ctx, 50.5, 180.5, 6, 80 * size);
    let spear = new UpperSpear(this.lozengeWidth, this.halfSpearHeight, this.padding);
    spear.drawMeasures(ctx, 50 + 180 * size + 0.5, 50.5, params.countX * 2, 55 * size);
  }

  reservePrimitives(width,height) {
    return [
      {title:'لوزی',name:'lozenge',primitive:new Lozenge(this.lozengeWidth, this.lozengeHeight)},
      {title:'لچک راست و چپ',name:'leftTriangle',primitive:new LeftTriangle(this.lozengeWidth/2, this.lozengeHeight)},
      {title:'نیزه حاشیه بالا و پایین',name:'upperSpear',primitive:new UpperSpear(this.lozengeWidth, this.halfSpearHeight)},

      // new Lozenge(width,height),
      // new UpperTriangle(width,height/2),
      // new UpperSpear(width/6,height),
    ];
  }
}
