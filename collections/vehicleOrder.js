/**
 * Created by pc on 12/1/2016.
 */
Vehicles = new Mongo.Collection('vehicles');
Colors = new Mongo.Collection('colors');
Models = new Mongo.Collection('models');

VehiclesSchema = new SimpleSchema({
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

ColorsSchema = new SimpleSchema({
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

ModelsSchema = new SimpleSchema({
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