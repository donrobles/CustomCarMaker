import {Mongo} from "meteor/mongo";
/**
 * Created by pc on 12/1/2016.
 */
let Vehicles = new Mongo.Collection("vehicles");
let Colors = new Mongo.Collection("colors");
let Models = new Mongo.Collection("models");

const VehiclesSchema = new SimpleSchema({
    owner: {
        label: "Owner",
        type: String,
        min: 1,
        optional: false,
    },
    model: {
        label: "Model",
        type: String,
        min: 1,
        optional: false,
    },
    color: {
        label: "Color",
        type: String,
        optional: false,
    },
    total_cost: {
        label: "Total Cost",
        type: SimpleSchema.Integer,
        optional: false,
    }
});

const ColorsSchema = new SimpleSchema({
    name: {
        label: "Name",
        type: String,
        min: 1,
        optional: false,
    },
    value: {
        label: "Value",
        type: String,
        min: 1,
        optional: false,
    },
    cost: {
        label: "Cost",
        type: SimpleSchema.Integer,
        optional: false,
    }
});

const ModelsSchema = new SimpleSchema({
    name: {
        label: "Name",
        type: String,
        min: 1,
        optional: false,
    },
    cost: {
        label: "Cost",
        type: SimpleSchema.Integer,
        optional: false,
    }
});

Vehicles.attachSchema(VehiclesSchema);
Models.attachSchema(ModelsSchema);
Colors.attachSchema(ColorsSchema);