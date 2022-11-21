const { Diet } = require('../db');
//const axios = require('axios');

const getAllDiets =  async (_req, res, _next) => {
  try{
    const bdInfo = await Diet.findAll({
      attributes: {exclude: ['id','createdAt', 'updatedAt']}
    });
    const diets = bdInfo.map(e => e.name)
    res.json(diets);
  }catch{
    res.status(400).json({ msg: "Error while getting the diets"});
  }
}

const storeAllDiets = async () => {
  try{
    let diets = [
      {
        id: -1,
        name: "all",
      },
      {
        id: 0,
        name: "dairy free",
      },
      {
        id: 1,
        name: "gluten free",
      },
      {
        id: 2,
        name: "ketogenic",
      },
      {
        id: 3,
        name: "vegetarian",
      },
      {
        id: 4,
        name: "lacto-vegetarian",
      },
      {
        id: 5,
        name: "ovo-vegetarian",
      },
      {
        id: 6,
        name: "vegan",
      },
      {
        id: 7,
        name: "pescatarian",
      },
      {
        id: 8,
        name: "paleo",
      },
      {
        id: 9,
        name: "primal",
      },
      {
        id: 10,
        name: "low fodmap",
      },
      {
        id: 11,
        name: "whole 30",
      },
    ];
    await Diet.bulkCreate(diets);
    console.log('Diets correctly stored into the DB');
  }catch{
    console.log('Unexpected error while storing  diets in the DB');
  }
}

module.exports = { getAllDiets, storeAllDiets }