'use strict'

module.exports = ({ data }) => {
    return {
        getAllStores(req, res) {
            data.getAllStores()
                .then(stores => {
                    res.json(stores);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getStoreById(req, res) {
            const id = req.params.id;

            data.getStoreById(id)
                .then(store => {
                    res.json(store);
                })
                .catch(err => {
                    console.log(err);
                })
        },
        createStore(req, res) {
            const store = req.body;

            data.createStore(store)
                .then(store => {
                    return res.status(201)
                        .json({
                            message: 'Store created'
                        });
                })
                .catch(err => {
                    return res.status(500).json({ 
                        error: "Failed to create store",
                        message: JSON.stringify(err)
                    });
                });
        }        
    }
}