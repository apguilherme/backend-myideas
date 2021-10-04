const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Idea = require("../model/idea");

const validationIdea = [
    check("title", "Title is mandatory.").not().isEmpty(),
    check("priority", "Priority is mandatory.").isIn(["low", "medium", "high"]),
]

router.get("/", async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.json(ideas);
    }
    catch (e) {
        res.status(500).send({ msg: `Ideas not found: ${e}` });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id)
        res.json(idea)
    } catch (err) {
        res.status(500).send({
            errors: [{ message: `Idea with id ${req.params.id} not found.` }]
        })
    }
})

router.post("/", validationIdea, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(({
            errors: errors.array()
        }))
    }
    try {
        let idea = new Idea(req.body);
        await idea.save();
        res.send(idea);
    }
    catch (e) {
        res.status(500).send({ msg: `Idea not created: ${e}` });
    }
})

router.put('/', validationIdea,
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(({
                errors: errors.array()
            }))
        }
        try {
            let idea = req.body;
            await Idea.findByIdAndUpdate(req.body._id, { $set: idea }, { new: true })
                .then(idea => {
                    res.send({ message: `Idea: ${idea.title}, succesfully updated.` })
                })
                .catch(err => {
                    return res.status(500).send({ message: `Error updating idea with id ${req.body._id}.` })
                })
        } catch (err) {
            return res.status(500).json({
                errors: [{ message: `Error updating idea: ${err.message}` }]
            })
        }
    })

router.delete('/:id', async (req, res) => {
    await Idea.findByIdAndRemove(req.params.id)
        .then(idea => {
            res.send({ message: `Idea: ${idea.title}, deleted succesfully` })
        }).catch(err => {
            return res.status(400).send({
                errors: [{ message: `Not possible to delete idea with id ${req.params.id}` }]
            })
        })
})

module.exports = router;