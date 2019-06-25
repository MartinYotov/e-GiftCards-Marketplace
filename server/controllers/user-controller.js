'use strict'

module.exports = ({ data }) => {
    return {
        getUser(req, res) {
            const username = req.params.username;
            data.getUserByUsername(username)
                .then(user => {
                    //if (user)
                    res.status(200).json(user);
                }).
                catch(err => {
                    console.error(err);
                    res.status(500);
                });
        }
    }
}