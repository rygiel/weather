window.onload = function () {

  new Vue({
    el: '#app',
    data: {
      weather: [],
      renderPage: false
    },
    mounted() {

      let idsQuery = [], ids = [1,2,3,4,5], tick=0;

      const mainLoop = (firstCall) => {
        if (firstCall || tick === 60000 ) {
          ids = _.shuffle(ids);
          idsQuery = ids.slice(0,3);
          tick = 0;
        } else {
          tick = tick + 1000 * 10;
        } 
        this.getWeather(idsQuery);
        setTimeout(mainLoop, 1000 * 10  );
      }

      mainLoop(true);

    },
    methods: {
      redirect(url) {
        window.location.href = url;
      },
      getWeather(ids) {
        var vm = this
        axios.get('/weather?id='+ids.join('&id='))
          .then(function (res) {
            vm.weather = _.orderBy(res.data, 'id');
            vm.renderPage = true;
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    }
  });

};
