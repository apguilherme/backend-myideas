const express = require("express");
const router = express.Router();

const Idea = require("../model/idea");

router.get("/", async (req, res) => {
    try{
        const ideas = await Idea.find();
        res.json(ideas);
    }
    catch (e){
        res.status(500).send({msg: `Ideas not found: ${e}`});
    }
});

router.post("/", async (req, res) => {
    try {
        let idea = new Idea(req.body);
        await idea.save();
        res.send(idea);
    } 
    catch (e){
        res.status(500).send({msg: `Idea not created: ${e}`});
    }
})

module.exports = router;