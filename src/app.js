import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: "#app",
    data: {
      favouriteCountries: [],
      countries: [],
      countryFiltered: null
    },

    mounted() {
      this.fetchCountries();
    },
    computed: {
      totalPopulationAll: function() {
        return this.countries.reduce((runTot, country) => {
          return runTot + country.population;
        }, 0);
      },

      findNeighbours: function() {
        // debugger;
        const neighboursArray = this.countryFiltered.borders;

        const neighboursArrayObj = neighboursArray.map((country) => {

          for (const c of this.countries) {
            if (c.alpha3Code === country) {
              return c;
            }
          }

        })

        return neighboursArrayObj;
        // console.log(neighboursArrayObj);
      }

    },
    methods: {
      fetchCountries: function() {
        const request = fetch('https://restcountries.eu/rest/v2/all');

        const response = request.then(response => response.json());

        const countriesArray = response.then(data => this.countries = data);
      },
      addToFavorites: function() {
          // const namesArray = this.favouriteCountries.map((country) => {
          //   return country.name;
          // });

          if (!this.favouriteCountries.includes(this.countryFiltered)) {
            this.favouriteCountries.push(this.countryFiltered)
          }


      }

      // fetchCountry: function(index) {
      //   return this.countries[index]
      // }
    }
  })
});
