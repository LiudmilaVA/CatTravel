
class Map {
    constructor(rows, cells) {
        this.rows = rows;
        this.cells = cells;
    }

    render (wrapper) {
        for (let i = 0; i < this.rows; i++) {
            const mapRow = document.createElement('tr');
            mapRow.classList = 'map__row';
            wrapper.insertAdjacentElement('afterbegin', mapRow);

            for (let j = 0; j < this.cells; j++) {
                const mapCell = document.createElement('td');
                mapCell.classList = 'map__cell';
                mapRow.insertAdjacentElement('afterbegin', mapCell);
            }
        }
    }
}

const map = document.querySelector('.map');
const newMap = new Map(100, 100);
newMap.render(map);


const navigation = document.querySelector('.navigation');

const mapPlayer = document.querySelector('.map__image');
const playerWidth = mapPlayer.offsetWidth;
const playerHeight = mapPlayer.offsetHeight;

const theCell = document.querySelector('td');
const cellWidth = theCell.offsetWidth;
const cellHeight = theCell.offsetHeight;

const tableMap = document.getElementById('tableMap');
const btnWrapper = document.querySelector('.btn--wrapper');
const recordBtn = document.querySelector('.btn__record');


class TheCat {
    constructor(player, step) {
        this.theCat = player;
        this.step = step;
        this.stepsAmount = {
            up: 1,
            down: 1,
            right: 1,
            left: 1
        };
        this.theCatWay = [];
        this.thePlayer = {
            x: 0,
            y: 0,
            tr: 0,
            td: 0
        };
    }

    moveOnClick(event) {
        switch (event.target.className) {
            case 'arrow arrow-down':
                this.moveArrow(this.thePlayer, 'down');
                break;
            case 'arrow arrow-up':
                this.moveArrow(this.thePlayer, 'up');
                break;
            case 'arrow arrow-right':
                this.moveArrow(this.thePlayer, 'right');
                break;
            case 'arrow arrow-left':
                this.moveArrow(this.thePlayer, 'left');
                break;
        }
    }

    recordOnClick(event) {
        const centerX = this.theCat.offsetLeft + playerWidth / 2;
        const centerY = this.theCat.offsetTop + playerHeight / 2;

        switch (event.target.className) {
            case 'arrow arrow-down':
                this.moveArrow(this.thePlayer, 'down');
                this.recordWay(centerX, centerY, 'down');
                break;
            case 'arrow arrow-up':
                this.moveArrow(this.thePlayer, 'up');
                this.recordWay(centerX, centerY, 'up');
                break;
            case 'arrow arrow-right':
                this.moveArrow(this.thePlayer, 'right');
                this.recordWay(centerX, centerY, 'right');
                break;
            case 'arrow arrow-left':
                this.moveArrow(this.thePlayer, 'left');
                this.recordWay(centerX, centerY, 'left');
                break;
        }
    }
    changeStepsAmount(event) {
        const amount = event.target.value;

        switch (event.target.className) {
            case 'arrow__step arrow__step-up':
                !!amount ? this.stepsAmount.up = Math.abs(amount) : this.stepsAmount.up = 1;
                break;
            case 'arrow__step arrow__step-down':
                !!amount ? this.stepsAmount.down = Math.abs(amount) : this.stepsAmount.down = 1;
                break;
            case 'arrow__step arrow__step-left':
                !!amount ? this.stepsAmount.left = Math.abs(amount) : this.stepsAmount.left = 1;
                break;
            case 'arrow__step arrow__step-right':
                !!amount ? this.stepsAmount.right = Math.abs(amount) : this.stepsAmount.right = 1;
                break;
        }
    }

    moveArrow(thePlayer, direction) {
        switch (direction) {
            case 'down':
                if (this.theCat.offsetTop + this.theCat.offsetHeight + this.step * this.stepsAmount.down <= map.offsetHeight) {
                    this.theCat.style.top = (thePlayer.y += this.step * this.stepsAmount.down) + 'px';
                } else {
                    this.unableMove('Bottom');
                }
                break;
            case 'up':
                if (this.theCat.offsetTop - (this.step * this.stepsAmount.up) >= map.offsetTop) {
                    this.theCat.style.top = (thePlayer.y += -this.step * this.stepsAmount.up) + 'px';
                } else {
                    this.unableMove('Top');
                }
                break;
            case 'right':
                if (this.theCat.offsetLeft + this.theCat.offsetWidth + (this.step * this.stepsAmount.right) <= map.offsetWidth) {
                    this.theCat.style.left = (thePlayer.x += this.step * this.stepsAmount.right) + 'px';
                } else {
                    this.unableMove('Right');
                }
                break;
            case 'left':
                if (this.theCat.offsetLeft - (this.step * this.stepsAmount.left) >= map.offsetLeft) {
                    this.theCat.style.left = (thePlayer.x += -this.step * this.stepsAmount.left) + 'px';
                } else {
                    this.unableMove('Left');
                }
                break;
        }
    }

    unableMove(direction) {
        map.style[`border${direction}Color`] = 'red';
        setTimeout(function () {
            map.style[`border${direction}Color`] = 'black';
        }, 500);
    }

    setStartPosition() {
        this.theCatWay.push({
           x: this.theCat.offsetLeft,
           y: this.theCat.offsetTop,
           center: Math.floor((this.theCat.offsetTop + playerHeight / 2) / cellHeight),
           end:  Math.floor((this.theCat.offsetLeft + playerWidth / 2) / cellWidth),
           direction: 'start'
        });
    }

    recordWay(x, y, direction) {
        let center, start, end;

        switch (direction) {
            case 'up':
            case 'down':
                center = Math.floor( x / cellWidth);
                start = Math.floor(y / cellHeight);
                end = Math.floor((this.theCat.offsetTop + playerHeight / 2) / cellHeight);
                break;
            case 'right':
            case 'left':
                center = Math.floor(y / cellHeight);
                start = Math.floor(x / cellWidth);
                end =  Math.floor((this.theCat.offsetLeft + playerWidth / 2) / cellWidth);
                break;
        }

        this.theCatWay.push({
            x: this.theCat.offsetLeft,
            y: this.theCat.offsetTop,
            end: end,
            center: center,
            start: start,
            direction: direction
        });

        this.colorTheWay(start, end, center, direction, 'red');
    }

    colorTheWay(start, end, center, direction, color) {
        switch (direction) {
            case 'down':
                for (let i = start; i <= end; i++) {
                    tableMap.rows[i].cells[center].style.backgroundColor = color;
                }
                break;
            case 'up':
                for (let i = start; i >= end; i--) {
                    tableMap.rows[i].cells[center].style.backgroundColor = color;
                }
                break;
            case 'right':
                for (let i = start; i <= end; i++) {
                    tableMap.rows[center].cells[i].style.backgroundColor = color;
                }
                break;
            case 'left':
                for (let i = start; i >= end; i--) {
                    tableMap.rows[center].cells[i].style.backgroundColor = color;
                }
                break;
            case 'start':
                tableMap.rows[center].cells[end].style.backgroundColor = color;
        }
    }

    playRecordWay() {
        const way = this.theCatWay;
        console.log(way);
        const cat = this.theCat;
        let color = 'green';
        let i = 0;
        let timer = setTimeout(function showTheWay() {
            cat.style.left = way[i].x + 'px';
            cat.style.top = way[i].y + 'px';

            switch (way[i].direction) {
                case 'down':
                case 'up':
                    tableMap.rows[way[i].end].cells[way[i].center].style.backgroundColor = color;
                    break;
                case 'right':
                case 'left':
                case 'start':
                    tableMap.rows[way[i].center].cells[way[i].end].style.backgroundColor = color;
                    break;
            }

            i++;
            if (i >= way.length) {
                timer = clearTimeout(timer);
            } else {
                timer = setTimeout(showTheWay, 500);
            }
        }, 500);
    }

    resetRecord() {
        const way = this.theCatWay;
        const cat = this.theCat;
        for (let key of way) {
            this.colorTheWay(key.start, key.end, key.center, key.direction, 'white');
        }
        this.theCatWay = [];
        cat.style.left = 0 + 'px';
        cat.style.top = 0 + 'px';

        this.stepsAmount = {
            up: 1,
            down: 1,
            right: 1,
            left: 1
        };

        this.thePlayer = {
            x: 0,
            y: 0,
            tr: 0,
            td: 0
        };
        const inputs = document.querySelectorAll('.arrow__step');
        inputs.forEach((item) => {
            item.value = 0;
        });
    }
}
const newCat = new TheCat(mapPlayer, 80);

function moveOnCLick(event) {
    newCat.moveOnClick(event);
}
function recordOnClick(event) {
    newCat.recordOnClick(event);
}

navigation.addEventListener('click', moveOnCLick);
navigation.addEventListener('change', (event) => {
    newCat.changeStepsAmount(event);
});

btnWrapper.addEventListener('click', (event) => {
   const btn = event.target.className;

   switch (btn) {
       case 'navigation__btn btn__record':
           recordBtn.style.backgroundColor = 'orange';
           newCat.setStartPosition();

           navigation.removeEventListener('click', moveOnCLick);
           navigation.addEventListener('click', recordOnClick);
           break;
       case 'navigation__btn btn__stop':
           navigation.removeEventListener('click', recordOnClick);
           navigation.addEventListener('click', moveOnCLick);

           recordBtn.style.backgroundColor = '#dcdcdc';
           break;
       case 'navigation__btn btn__play':
           newCat.playRecordWay();
           break;
       case 'navigation__btn btn__reset':
           newCat.resetRecord();
           break;
   }
});
