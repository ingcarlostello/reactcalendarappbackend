// const express = require('express');
const {response} = require('express');
const Event = require('../models/Event');


const getEvents = async (req, res = response) => {

    const events = await Event.find().populate('user', 'name');

    res.json({
        ok: true,
        // msg: 'Todos los eventos'
        events
    })
}

const createEvent = async (req, res = response) => {

    console.log(req.body);
    const event = new Event(req.body);

    // tarea asincrona
    try {
        event.user = req.uid
        const saveEvent = await event.save();
        res.json({
            ok: true,
            evento: saveEvent
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact with support'
        })
    }
}

const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({
                of: false,
                msg: 'This event does not exist'
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                of: false,
                msg: 'You do not have privileges to modify this event.'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }
                                                                                // mostrar en postan el registro actualizado
        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});

        res.json({
            ok: true,
            event: eventUpdated 
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact with support'
        })
    };
}

const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({
                of: false,
                msg: 'This event does not exist'
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                of: false,
                msg: 'You do not have privileges to delete this event.'
            })
        }
                                                                                // mostrar en postan el registro actualizado
        const eventUpdated = await Event.findByIdAndDelete(eventId);

        res.json({
            ok: true
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact with support'
        })
    };
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}