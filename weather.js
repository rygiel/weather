const YQL = require('yql');
const Rx = require('rxjs/Rx');

fetch = (places) => {
    return Rx.Observable.create((observer) => {

        let i=0;
        places.forEach((place)=>{
            const query = new YQL(`
                select * from 
                weather.forecast 
                where 
                woeid in (select woeid from geo.places(1) 
                where text='${place.city}, ${place.country}')
                `);

            query.exec((err, data) => {

                if (err) {
                    observer.error(err);
                    return;
                }

                var condition = data.query.results.channel.item.condition;
                place.temp =  Math.ceil((condition.temp-32)/1.8);
                place.text = condition.text;
                observer.next(place);
                i++;
                if (i === places.length) {
                    observer.complete();
                }
            });

        });

    });
};

module.exports = {
    fetch: fetch
};