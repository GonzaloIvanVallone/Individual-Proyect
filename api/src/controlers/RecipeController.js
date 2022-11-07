const { Recipe, Diet } = require('../db');
const { Op } = require("sequelize");
const axios = require('axios');
const { API_KEY } = process.env;

//---------------------------------------------------------------------------------------------------------------------

const getBdInfo = async(name) =>{
    let arr = await Recipe.findAll({ 
        where: {
            title: {
                [Op.substring]: `${name}`,
            },
        }, 
        include: Diet,
        attributes: {exclude: ['createdAt', 'updatedAt']}
    });
    return arr
}

const antiCrash = async (id) =>{
    try{
        const apiResponse = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
        const apiInfo = {
            id: apiResponse.data.id,
            title: apiResponse.data.title,
            image: apiResponse.data.image,
            healthScore: apiResponse.data.healthScore,
            summary: apiResponse.data.summary,
            dishTypes: apiResponse.data.dishTypes,
            diets: apiResponse.data.diets.map(e => {return {name: e}}),
            instructions: apiResponse.data.instructions,
        }
        return apiInfo;
    }catch{
        return;
    }
}

const antiCrash2 = async (name)=>{
    try{
        const apiResponse = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&query=${name}&number=9`);
        const apiInfo = await apiResponse.data.results.map(e => {
            return {
                id: e.id,
                title: e.title,
                image: e.image,
                healthScore: e.healthScore,
                summary: e.summary,
                dishTypes: e.dishTypes,
                diets: e.diets.map(e => {return {name: e}}),
                instructions: apiResponse.data.instructions,
               
            }
        });
        return apiInfo;
    }catch{
        return;
    }
}

//----------------------------------------------------------------------------------------------------------------------

const getRecipes =  async (req, res, _next) => {
    let recipesToSearch = req.query.name;
    try{
        if(recipesToSearch){
            recipesToSearch = recipesToSearch.toLowerCase();
            const apiInfo = await antiCrash2(recipesToSearch);
            console.log("INFORMACION RECIBIDA DE LA API: ", apiInfo)
            const bdInfo = await getBdInfo(recipesToSearch);
            //console.log("INFORMACION RECIBIDA DE LA BD: ", bdInfo);
            if(apiInfo.length > 0 && bdInfo.length > 0){
                //console.log("ENTRE ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA 1")
                let totalInfo = apiInfo.concat(bdInfo);
                //console.log("INFORMACION TOTAL: ", totalInfo);
                res.status(200).json(totalInfo);
            }else if(apiInfo.length > 0){
                //console.log("ENTRE ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA 2")
                res.status(200).json(apiInfo);
            }else{
                if(bdInfo.length > 0){
                    //console.log("ENTRE ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA 3")
                    //console.log(bdInfo)
                    res.status(200).json(bdInfo);
                }else{
                    //console.log("ENTRE ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA 4")
                    res.status(400).json({msg: "There is no Recipe with the especified name"})
                }
            }
        }
    }catch{
        res.status(404).json({ msg: "Error while searching recipes"});
    }
}
//---------------------------------------------------------------------------------------------------------------------------------
const getById =  async (req, res, _next) => {
    try{
        const { id } = req.params;
        if(id){
            if(id.length == 36){
                let bdInfo = await Recipe.findByPk(id, { include: Diet });
                if(bdInfo){
                    res.status(200).json([bdInfo]);
                }
            }else{
                const apiResponse = await antiCrash(id);
                //console.log(apiResponse);
                if(apiResponse){
                    res.status(200).json(apiResponse)
                }else{
                    res.status(400).json({msg: "There is no Recipe with the especified ID"})
                }
            }
        }else{
            res.status(400).json({msg: "must provide ID"})
        }
    }catch{
        res.status(404).json({ msg: "Unexpected error while searching by ID"});
    }
}
//---------------------------------------------------------------------------------------------------------------------------------
const postRecipe =  async (req, res, _next) => {
    try{
        const {
            title,
            summary,
            healthScore,
            instructions,
            diets,
            image,
        } = req.body;
        console.log(req.body)
        if(!title || !summary || !healthScore || !instructions || !diets.length || !image){
            res.status(400).json({ msg: "Missing data"})
        }else{
            console.log("111111111111111111111111111111111")
            let newRecipe = {...req.body, title: req.body.title.toLowerCase()}; 
            console.log("22222222222222222222222222222222")
            const [recipe, created] = await Recipe.findOrCreate({
                where: { title: newRecipe.title}, 
                defaults:{
                    ...newRecipe,
                }
            });
            console.log("33333333333333333333333333333333")
            if(created === true){//newly created 
                let dietsDB = await Diet.findAll({
                    where: { name: diets}
                });
                console.log("44444444444444444444444444444444")
                recipe.addDiets(dietsDB);
                res.status(200).json({ msg : 'Recipe stored correctly' });
            }else{
                res.status(400).json({ msg: "Error, the recipe already exist"});
            }
        }
    }catch(e){
        res.status(400).json({ msg: "Error while storing the recipe in the DB"});
    }
}

module.exports = { getRecipes, getById, postRecipe }