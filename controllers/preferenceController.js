const userModel = require("../models/user");
const preferenceModel = require("../models/preferences");

// Add preference
exports.addPreference = (req, res, next) => {
    let preference = new preferenceModel(req.body);
    console.log(preference)
    preference.user = req.session.user;

    preference
        .save()
        .then((preference) => {
        req.flash("success", "Preference added successfully");
        res.redirect("/users/profile");
        })
        .catch((err) => {
        if (err.name === "ValidationError") {
            req.flash("error", err.message);
            return res.redirect("/users/profile");
        }
        next(err);
        });
}

exports.updatePreference = (req, res, next) => {
    let user = req.session.user;
    let preference = req.body;
    console.log(preference)

    preferenceModel
        .findOneAndUpdate({ user: user }, { 
            $set: {
                "age": preference.age,
                "breed": preference.breed,
                "distance": preference.distance,
                "location": preference.location,
                "size": preference.size,
                "type": preference.type,
            }
         } )
        .then((preference) => {
            req.flash("success", "Preference updated successfully");
            res.redirect("/users/profile");
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
                req.flash("error", err.message);
                return res.redirect("/users/profile");
            }
            next(err);
        });
}