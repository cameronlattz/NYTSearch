

const nyTimeObj = {
    

    apiKey: "api-key=bGSodPFA5A5OEag0v70hW30qtETQ9HJE",
    baseUrl:  "https://api.nytimes.com/svc/search/v2/articlesearch.json?",
    defaultParam: "",
    defailtLimit: "",
    searchParam: "",
    numOfButtons: 0,
    domCarBodyDiv: document.getElementById("card-body"),
    

    resetFuncton: function () {
        this.domCarButtonsDiv.interHTML = "";
        this.numOfButtons = 0;

    },

    fetchArticle: function (topicName) {

        const itemVal = "&q="+topicName;
        const finalQuery = nyTimeObj.baseUrl
                                            // + nyTimeObj.defaultParam
                                            // + nyTimeObj.defailtLimit
                                            + nyTimeObj.apiKey
                                            + nyTimeObj.searchParam + itemVal;

        console.log("final quelry: " + finalQuery);

        fetch(finalQuery)
            .then(function (response) {
            return response.json()
            })
            .then(function (responseJson) {

            console.log(responseJson);
            nyTimeObj.loadArticle(responseJson);

            });        
    },


    loadArticle : function (responseJson) {
        
        for (let index = 0; index < responseJson.data.length ; index++)
        {
            const cardDiv = document.createElement("div");
            cardDiv.className = "card bg-info mb-1 pb-1 rounded";
            cardDiv.style = "width: 12rem; height:12rem; float:left"; 
            

            const cardBodyDiv = document.createElement("div");
            cardBodyDiv.className = "card-body-sm bg-info rounded";
            

            const textElem = document.createElement("h6");
            textElem.className = "card-title-sm";
            textElem.textContent = responseJson.data[index].title === "" ? "No Title": ""/* need to reference JSON obj */ ;
            cardBodyDiv.appendChild(textElem);

            const cardImg = document.createElement("img");
            cardImg.className = "card-img-bottom embed-responsive-item m-1 p-1 rounded";            
            cardImg.style = "width: 11rem; height:8rem;";
            cardImg.src = responseJson.data[index].images.fixed_height.url;
            
            cardImg.setAttribute("item_value", /* need to reference JSON obj */"");            
            cardImg.addEventListener("click", this.changeCarPics);

            cardDiv.appendChild(cardBodyDiv);            
            cardDiv.appendChild(cardImg);

            
            this.domCarBodyDiv.prepend(cardDiv);
        }
    },

    generateArticle: function() {
        this.fetchArticle("Obama");
    }
}

window.onload = function(){    
    nyTimeObj.generateArticle(); 
}
