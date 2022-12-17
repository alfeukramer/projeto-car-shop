"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Motorcycle {
    constructor(motorcycle) {
        this.id = motorcycle.id;
        this.model = motorcycle.model;
        this.year = motorcycle.year;
        this.color = motorcycle.color;
        this.status = motorcycle.status;
        this.buyValue = motorcycle.buyValue;
        this.category = motorcycle.category;
        this.engineCapacity = motorcycle.engineCapacity;
    }
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    setModel(model) {
        this.model = model;
    }
    getModel() {
        return this.model;
    }
    setYear(year) {
        this.year = year;
    }
    getYear() {
        return this.year;
    }
    setColor(color) {
        this.color = color;
    }
    getColor() {
        return this.color;
    }
    setStatus(status) {
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
    setBuyValue(buyValue) {
        this.buyValue = buyValue;
    }
    getBuyValue() {
        return this.buyValue;
    }
    setCategory(category) {
        this.category = category;
    }
    getCategory() {
        return this.category;
    }
    setEngineCapacity(engineCapacity) {
        this.engineCapacity = engineCapacity;
    }
    getEngineCapacity() {
        return this.engineCapacity;
    }
}
exports.default = Motorcycle;
