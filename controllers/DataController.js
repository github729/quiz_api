var models = require('../models');
var Sequelize = require('sequelize');

exports.getAllLocations = function (req, res) {

    models.states.hasMany(models.cities, { foreignKey: 'state_id' });

    models.states.findAll({
        include: [
            {
                model: models.cities,
            }
        ]
    }).then(data => {
        let result = {} ;
        if(data) {
            result.data = data;
            result.success = true;
        }else {
            result.success = false;
            result.message = 'No Locations Found'
        }
        res.json(result);
    })
}