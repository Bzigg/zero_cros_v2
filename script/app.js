"use strict";

const factory = new AbstractFactory;

let game = factory.create(Game);

game.mount();