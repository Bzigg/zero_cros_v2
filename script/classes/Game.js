"use strict";

/**
 * класс Game
 * countFlag - последовательность ходов (четное - ходит человек, не четное ходит робот)
 * user, robot экземпляры классов
 * area игровое поле
 */
class Game {
    countFlag = null;
    user = factory.create(User);
    robot = factory.create(Robot);
    area = document.querySelector('.game');
    /**
     * инициализирующий метод
     */
    mount() {
        this.createArea();
        this.afterMount();
    }
    /**
     * метод размечает сетку поля
     */

    createArea() {
        for (let i = 0; i < 9; i++) {
            let block = document.createElement('div');
            block.classList.add('block');
            block.id = `i-${i}`;
            this.area.append(block);
        }
    }
    /**
     * слушатель кнопка "играть"
     */
    afterMount() {
        let btn = document.querySelector('#play');
        btn.addEventListener('click', this.checkChois.bind(this));
    }
    /**
     * метод записывает "игрового персонажа" в character
     */
    checkChois() {
        event.preventDefault();
        let allNode = Array.from(document.querySelectorAll('input'));
        let chois = allNode.filter(radioItem => radioItem.checked)[0].value;

        this.user.character = chois;

        this.robot.character = (allNode.filter(radioItem => !radioItem.checked)[0].value);

        this.beforeStartGame();
    }
    /**
     * задает countFlag для старта игры
     */
    beforeStartGame() {
        if (this.user.character == 'x') {
            this.countFlag = 0;
        }
        else {
            this.countFlag = 1;
        }
        this.playGame();
    }
    /**
     * ход игры. если выбранная ячейка корректна делаем вызываем "ход" персонажа
     */
    playGame() {
        if (this.countFlag % 2 == 0) {
            this.area.onclick = (event) => {
                if (this.user.checkEmpty(document.querySelector(`#${event.target.id}`))) {
                    this.move(document.querySelector(`#${event.target.id}`), this.user.character);
                }
            }

        }
        else {
            this.move(document.querySelector(`#i-${this.robot.getId()}`), this.robot.character);
        }
    }
    /**
     * делает ход 
     * @param {Object} elementOfArea выбранная клетка
     * @param {String} character "персонаж"
     */
    move(elementOfArea, character) {
        elementOfArea.innerHTML = character;
        if (this.checkWinner() == 0) {
            this.countFlag++;
            this.playGame();
        }
        else if (this.checkWinner() == -1) {
            this.endGame('Победила дружба');
        }
        else {
            if (this.countFlag % 2 == 0) this.endGame('Вы победили');
            else this.endGame('ИИ победил');
        }
    }
    /**
     * проверка победителя: 1 - есть победитель; 0 - нет победителя (игра продолжается); -1 - ничья
     * @returns Number
     */
    checkWinner() {
        let elements = document.querySelectorAll('.block');
        if (elements[0].innerHTML == elements[1].innerHTML && elements[0].innerHTML == elements[2].innerHTML && elements[0].innerHTML != '') {
            return 1;
        }
        if (elements[3].innerHTML == elements[4].innerHTML && elements[3].innerHTML == elements[5].innerHTML && elements[3].innerHTML != '') {
            return 1;
        }
        if (elements[6].innerHTML == elements[7].innerHTML && elements[6].innerHTML == elements[8].innerHTML && elements[6].innerHTML != '') {
            return 1;
        }
        if (elements[0].innerHTML == elements[3].innerHTML && elements[0].innerHTML == elements[6].innerHTML && elements[0].innerHTML != '') {
            return 1;
        }
        if (elements[1].innerHTML == elements[4].innerHTML && elements[1].innerHTML == elements[7].innerHTML && elements[1].innerHTML != '') {
            return 1;
        }
        if (elements[2].innerHTML == elements[5].innerHTML && elements[2].innerHTML == elements[8].innerHTML && elements[2].innerHTML != '') {
            return 1;
        }
        if (elements[0].innerHTML == elements[4].innerHTML && elements[0].innerHTML == elements[8].innerHTML && elements[0].innerHTML != '') {
            return 1;
        }
        if (elements[2].innerHTML == elements[4].innerHTML && elements[2].innerHTML == elements[6].innerHTML && elements[2].innerHTML != '') {
            return 1;
        }
        let count = 0
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].innerHTML == '') {
                count++;
            };
        }
        if (count == 0) {
            return -1; //ничья
        }

        return 0;

    }
    /**
     * конец игры
     * @param {String} messageString сообщение о конце игры.
     */
    endGame(messageString) {
        alert(messageString);
        location.reload();
    }
}