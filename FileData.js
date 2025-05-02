/** Contains data associated with each individual file. */
export class FileData {

    /** Builds a FileData object.
     * @param {string} name - the name of the file
     * @param {string} contents - the body (source code) */
    constructor(name, contents) {
        this.name = name;
        let lineList = contents.split("\n");

        this.lines = [];
        for (let i = 0; i < lineList.length; i++) {
            this.lines.push(lineList[i], this, i);
        }
    }
}

/** Contains data associated with each individual line. */
export class LineData {

    /** Builds a LineData object.
     * @param {string} content - the textual content of the line
     * @param {FileData} parent - the parent file
     * @param {int} index - the index of this line in the parent file */
    constructor(content, parent, index) {
        this.content = content;
        this.parent = parent;
        this.index = index;
        this.width = textWidth(content);
    }
}