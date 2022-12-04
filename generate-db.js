const fs = require("fs");
const Chance = require("chance");
const { v4: uuid } = require("uuid");

const chance = new Chance();

const user = { firstName: chance.first(), lastName: chance.last() };

const content = {
  user,
  creatives: [...Array(32).keys()].map(() => {
    return {
      id: uuid(),
      createdBy: user,
      contributors: [
        user,
        ...Array(chance.integer({ min: 1, max: 5 })).keys(),
      ].map(() => ({
        id: uuid(),
        firstName: chance.first(),
        lastName: chance.last(),
      })),
      lastModified: chance.date({
        min: new Date("2019-01-01T00:00:00.000Z"),
        max: new Date("2021-08-01T00:00:00.000Z"),
      }),
      enabled: chance.bool(),
      title: chance
        .sentence({ words: chance.integer({ min: 3, max: 7 }) })
        .replace(".", ""),
      description: chance.paragraph({
        sentences: chance.integer({ min: 1, max: 3 }),
      }),
      content: chance
        .sentence({ words: chance.integer({ min: 1, max: 5 }) })
        .replace(".", ""),
      formats: [...Array(chance.integer({ min: 1, max: 5 })).keys()].map(
        () => ({
          width: chance.integer({ min: 100, max: 600 }),
          height: chance.integer({ min: 100, max: 600 }),
        })
      ),
    };
  }),
};

try {
  fs.writeFileSync("./db.json", JSON.stringify(content));
} catch (error) {
  console.error(error);
}
