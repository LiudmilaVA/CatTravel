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

