'use strict';
const _random = (max) => {
    return Math.round(Math.random() * 1000) % max;
}
const updateData = (data, mod = 10) => {
    const newData = [...data];
    for (let i = 0; i < newData.length; i += 10) {
        newData[i] = Object.assign({}, newData[i], { label: newData[i].label + ' !!!' });
    }
    return newData
}
export const buildData = (id, count = 1000) => {
    var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
    var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
    var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
    var data = [];
    for (var i = 0; i < count; i++)
        data.push({ id: id++, label: adjectives[_random(adjectives.length)] + " " + colours[_random(colours.length)] + " " + nouns[_random(nouns.length)] });
    return { data, id };
}

export const add = (id, data) => {
    const newData = buildData(id, 1000);

    return { data: [...data, ...newData.data], id: newData.id };
}

export const add100 = (id, data) => {
  const newData = buildData(id, 100);

  return { data: [...data, ...newData.data], id: newData.id };
};

export const run = id => buildData(id);
export const run100 = id => buildData(id, 100);

export const runLots = (id) => {
    return buildData(id, 10000);
}
export const update = (data) => {
    return updateData(data);
}

export const swapRows = (data) => {
    const newData = [...data];
    if (newData.length > 10) {
        let temp = newData[4];
        newData[4] = newData[9];
        newData[9] = temp;
    }
    return newData;
}
export const deleteRow = (data, id) => {
    return data.filter(d => {
        return d.id != id
    });
}