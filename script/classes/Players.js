"use strict";

/**
 * базовый класс игрока.
 * character - "персонаж игрока"
 */
class Player {
    constructor(character) {
        this.character = character;
    }
    /**
     * проверка корректной ячейки
     * @param {Object} element проверяемый элемент
     * @returns true - ячейка пуста, false - занята
     */
    checkEmpty(element) {

        if (element.innerHTML == '') {
            return true;
        }
        return false;

    }
}
class User extends Player { }
class Robot extends Player {
    /**
     * генератор случайных чисел-id для хода робота
     * @returns вернет "корректное" число для хода робота
     */
    getId() {

        let num = Math.floor(Math.random() * (9 - 0)) + 0;
        let element = document.querySelector(`#i-${num}`);

        num = this.checkEmpty(element) ? num : this.getId();
        console.log(num);
        return num;

    }
}