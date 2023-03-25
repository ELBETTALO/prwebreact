let server="http://localhost:8000";

function postServiceData(method, params){
    return fetch(server + "/" + method, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
    .then((response) => 
        response.json()
        .then((data) => {
            return Promise.resolve(data);
        })
        .catch (error => {
            console.log(error);
            return error;

        })
        );
    }

    export function stringToDate(_date) {
        var delimiter = "-";
        var formatLowerCase = "yyyy-mm-dd";
        if ( _date.indexOf("/") > 0) {
            delimiter = "/";
            formatLowerCase = "dd/mm/yyyy";
        }
        var formatItems=formatLowerCase.split(delimiter);

        var dateItems= _date.split(delimiter);

        var monthIndex=formatItems.indexOf("mm");

        var dayIndex=formatItems.indexOf("dd");

        var yearIndex=formatItems.indexOf("yyyy");
        var month= parseInt(dateItems[monthIndex]);
        month-=1;
    
        var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
        return formatedDate.toDateString();
    }
    
export { postServiceData} ;

