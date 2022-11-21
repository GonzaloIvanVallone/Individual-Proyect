/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const receta = {
  title: 'Milanesa a la napolitana',
  id: 646185,
  image: "asd.jpg",
  summary:"asdasdasd",
  healthScore: 98,
  instructions: "asdasdasddd",
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(receta)));
  }
);

describe("GET /recipe", async () => {
  it("Recipes are returned", (done) =>
    agent
      .get("/recipe?name=ham")
      .then(done())
      .catch(() => done(new Error("Error")))).timeout(10000);
  it('should work if the id exist in the api', () =>{
    agent.get(`/recipe/646185`).expect(400);
  });
  it("should throw an error if id doesn't exist", () => {
    agent.get(`/recipe/999999999999`).expect(404);
  });
  it("should work if the recipe exist in the db", async (done) => {
    agent.get(`/recipe/${receta.id}`).expect(200);
    agent.then(done())
  }).timeout(10000);
  it("should throw an error if no recipe contain the name", () => {
    agent.get(`/recipe?name=jkkkrkkjjj`).expect(404);
  });
});

