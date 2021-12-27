export default class Primitive {
    constructor(width, height, padding = 0, lineWidth = 1) {
        this.width = width;
        this.height = height;
        this.padding = padding;
        this.lineWidth = lineWidth;
        this.drawablePoints = [];
        this.points = [];
        this.offsetX = 0;
    }

    set_line_width(size) {
        this.lineWidth = size;
    }

    set_padding(padding) {
        this.padding = padding;
    }

    shiftXY(x, y) {
        this.points.forEach(p => {
            p.x += x;
            p.y += y;
        })
        this.drawablePoints.forEach(p => {
            p.x += x;
            p.y += y;
        })
    }

    draw(ctx) {

        ctx.beginPath();
        ctx.strokeStyle='#bbb';
        ctx.fillStyle='#eee'
        ctx.setLineDash([3,3]);
        let fp = this.points[0];
        ctx.moveTo(Math.floor(fp.x) + 50.5, Math.floor(fp.y) + 50.5);
        this.points.slice(1).forEach(p => {
            ctx.lineTo(Math.floor(p.x) + 50.5, Math.floor(p.y) + 50.5);
        });
        ctx.closePath();
        // ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        let my_gradient = ctx.createLinearGradient(0, 0, 100, 400);
        my_gradient.addColorStop(0, "#ccc");
        my_gradient.addColorStop(0.55, "#fafafa");
        my_gradient.addColorStop(0.7, "#fafafa");
        my_gradient.addColorStop(1, "#ddd");
        ctx.fillStyle = my_gradient;
        ctx.lineWidth =1;// this.lineWidth;
        ctx.setLineDash([]);
        ctx.strokeStyle='#ccc';
        fp = this.drawablePoints[0];
        ctx.moveTo(Math.floor(fp.x) + 50.5, Math.floor(fp.y) + 50.5);
        this.drawablePoints.slice(1).forEach(p => {
            ctx.lineTo(Math.floor(p.x) + 50.5, Math.floor(p.y) + 50.5);
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

    }

    isInside(p) {
        let size = this.points.length;
        for (let i = 0; i < size; i++) {
            if (Math.abs(p.x - this.points[i].x) < .00000001 && Math.abs(p.y - this.points[i].y) < .00000001) return false;
            if (!this.isLeft(p, this.points[i], this.points[(i + 1) % size])) return false;
        }
        return true;
    }

    isLeft(p, p1, p2) {
        return (p2.x - p1.x) * (p.y - p1.y) - (p2.y - p1.y) * (p.x - p1.x) > 0;
    }

    isInDrawerBound(width, height) {
        return !this.points.some(p => p.x < 0 || p.x > width || p.y < 0 || p.y > height);
    }
}
