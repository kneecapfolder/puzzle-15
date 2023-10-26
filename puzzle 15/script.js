// init
const BOARD = document.getElementById("board");
var empty;
var tiles = [];

// classes
class Tile {
    constructor(_x, _y) {
        this.num;
        this.x = _x;
        this.y = _y;
        this.clickable = false;

        this.obj = document.createElement("div");
        this.obj.classList.add("tile")
        this.obj.onmousedown = () => {
            if (!this.clickable) return;
            let temp = {x: empty.x, y: empty.y};
            empty.x = this.x;
            empty.y = this.y;
            this.x = temp.x;
            this.y = temp.y;
            this.update_self();
            check_clickable();
            check_complete();
        };
        BOARD.appendChild(this.obj);
        this.update_self();
    }
    update_self() {
        this.obj.style.marginLeft = `${this.x*12.5}vh`;
        this.obj.style.marginTop = `${this.y*12.5}vh`;
    }
}

// check if solvable
function check_solvable() {
    let count = 0;
    for(let i = 0; i < tiles.length; i++) 
        for(let j = i; j < tiles.length; j++) 
            if (tiles[i].num > tiles[j].num) count++;
    return empty.y%2 != 0? count%2 == 0 : count%2 != 0;
}

// shuffle pieces
function shuffle_tiles() {
    // random nums
    let nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    do {
        nums.sort(() => Math.random() - .5);
        for(let i = 0; i < nums.length; i++) {
            tiles[i].num = nums[i];
            tiles[i].obj.innerText = tiles[i].num;
        };
    } while(!check_solvable());
    check_clickable();
    check_complete();
}

// check complete place
function check_complete() {
    tiles.forEach(tile => {
        tile.obj.classList.remove("completed");
        if ((tile.y*4)+tile.x+1 == tile.num) tile.obj.classList.add("completed");
    });
}

// check clickable tiles
function check_clickable() {
    tiles.forEach(tile => {
        tile.clickable = false;
        if (empty.x == tile.x && [empty.y-1, empty.y+1].includes(tile.y) || empty.y == tile.y && [empty.x-1, empty.x+1].includes(tile.x))
        tile.clickable = true;
    });
}

// spawn tiles
function spawn_tiles() {
    BOARD.innerHTML = "";
    tiles = []
    let exclude = Math.floor(Math.random() * 16);
    for(let y = 0; y < 4; y++)
        for(let x = 0; x < 4; x++) {
            if (y*4+x != exclude) tiles.push(new Tile(x, y))
            else empty = {x: x, y: y};
        }
    shuffle_tiles();
}

// execute
spawn_tiles();