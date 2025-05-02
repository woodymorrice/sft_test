import { FileData, LineData } from './FileData.js';

let rows, cols, nFiles;
let fileList = [], fileContents = [];
let consola, segoeui;

function preload() {
    // load repository to display into project
    fileList = loadJSON('/file-list.json');

    // SegoeUI for ui components, Consolas for actual code
    consola = loadFont('fonts/consola.ttf');
    segoeui = loadFont('fonts/segoeui.ttf')
}

async function setup() {
    createCanvas(1440, 900);

    // builds an array of filenames and their content in text form
    fileContents = await getFiles(fileList);


    console.log(fileList);

    // finds a good set of dimensions to show pages for row-major
    [rows, cols] = calculateRowsAndCols(fileContents.length);

    textAlign(LEFT, TOP); // super important
    textSize(16);
    textFont(consola)
}

function draw() {
    background(0);

    fill(255);
    if (rows && cols) {
        let x = 20;
        let y = 20;

        // debug stuff
        text(`# of Files: ${fileContents.length}, Rows: ${rows}, Cols: ${cols}`, x, y);
        y += 20;

        let lineHeight = 20;

        let file = fileContents[42].content.trim().split('\n');
        for (let i = 0; i < file.length; i++) {
               text(file[i], x, y + i*lineHeight);
        }

    } else {
        text("Loading files...", 20, 20);
    }

    drawGrid(rows, cols, width, height);
}
/* for debug purposes */
function drawGrid(rows, cols, width, height) {
    let colWidth = width / cols;
    let rowHeight = height / rows;

    stroke(255);

    // Draw vertical lines
    for (let x = 0; x <= width; x += colWidth) {
        line(x, 0, x, height);
    }

    // Draw horizontal lines
    for (let y = 0; y <= height; y += rowHeight) {
        line(0, y, width, y);
    }
}

function getFiles(fileList) {
    // convert file list to an array (if it's an Object)
    let files = Object.values(fileList);

    let fileContents = []

    let promises = files.map(filename =>
    fetch('/click/' + filename)
        .then(res => res.text())
        .then(text => {
            fileContents.push({
                name: filename,
                content: text
            });
        })
    );

    return Promise.all(promises).then(() => fileContents);
}


function calculateRowsAndCols(nItems) {
    // edge cases
    if (nItems === 1) {
        return [1, 1];
    }
    if (nItems === 2) {
        return [1, 2];
    }

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