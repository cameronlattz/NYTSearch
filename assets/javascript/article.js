

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
        
        for (let index = 0; index < responseJson.response.docs.length ; index++)
        {
            const doc = responseJson.response.docs[index];
            const cardDiv = document.createElement("div");
            cardDiv.className = "card bg-info mb-1 pb-1 rounded";
            cardDiv.style = "width: 12rem; height:12rem; float:left"; 
            

            const cardBodyDiv = document.createElement("div");
            cardBodyDiv.className = "card-body-sm bg-info rounded";
            

            const textElem = document.createElement("h6");
            textElem.className = "card-title-sm";
            textElem.textContent = doc.headline.print_headline === "" ? "No Title": doc.headline.print_headline;
            cardBodyDiv.appendChild(textElem);
            cardDiv.appendChild(cardBodyDiv);

            const cardImg = document.createElement("img");
            cardImg.className = "card-img-bottom embed-responsive-item m-1 p-1 rounded";            
            cardImg.style = "width: 11rem; height:8rem;";
            for (let j = 0; j < doc.multimedia.length; j++) {
                const multimedia = doc.multimedia[j];
                if (multimedia.subtype === "thumbnail") {
                    cardImg.src = multimedia.url;            
                    cardDiv.appendChild(cardImg);
                }
            }
            
            document.getElementById("articleCardBody").prepend(cardDiv);
        }
    },

    generateArticle: function() {
        this.fetchArticle("Obama");
    }
}

window.onload = function(){    
    nyTimeObj.generateArticle(); 
}
