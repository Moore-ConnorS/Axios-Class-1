let favorites = [];
let id = 0;

module.exports = {
    

    readFavorites: (req, res) => {
        res.status(200).send(favorites);
      },

    addFavorites: (req, res) => {
        const { imageUrl, name } = req.body;
        const newFavorite = {
          imageUrl: imageUrl,
          name: name.toLowerCase(),
          id: id
        };
        favorites.push(newFavorite);
        id++;
        res.status(200).send(favorites);
      },

    updateFavorites: (req, res) => {
        const { id } = req.params;
        const { imageUrl, name } = req.body;
        favorites.forEach(card => {
          if (card.id === +id) {
            (card.imageUrl = imageUrl),
            (card.name = name.toLowerCase());
          }
        });
        res.status(200).send(favorites);
      },

    deleteFavorite: (req, res) => {
        const { id } = req.params;
        favorites = favorites.filter(card => {
          return card.id !== +id;
        });
        res.status(200).send(favorites);
      },


    searchOnServer: (req, res) => {
        const { name } = req.query;
        let searched = name.toLowerCase();
        let filteredList = favorites.filter((card) => {
            console.log(card.name, name)
            return card.name.includes(searched)
        })

        if(name){
            res.status(200).send(filteredList)
        }else {
            res.status(200).send(favorites)
        }
    }
}