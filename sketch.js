let rows, cols;

function setup() {
    createCanvas(1440, 900);

    [rows, cols] = calculateRowsAndCols(1440);

    console.log(rows, cols)
    textSize(32);
}

function draw() {
    background(0);

    fill(255);

    text(rows + " " + cols, 40, 40)
}

function calculateRowsAndCols(nItems) {
    let divisor = 2;

    while (true) {
        if (divisor > Math.floor(nItems / 2)) {
            nItems++;
            divisor = 2;
            continue;
        }

        if (nItems % divisor === 0) {
            let factor = nItems / divisor;
            let ratio = factor / divisor;

            if (ratio >= 1 && ratio <= 2) {
                return [divisor, factor];
            }
        }

        divisor++;
    }
}