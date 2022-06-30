document.addEventListener('DOMContentLoaded', function () {
    // // let requestOptions = {
    // //     method: 'GET',
    // //     redirect: 'follow'
    // // };

    // // dd086e9d-4f05-4e3f-b762-dc7d5a0a0fa3
    //api get request for crypto asset data to populate currency market section
    fetch('https://api.coincap.io/v2/assets/?_limit=20')
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        //the data will then be input into the function populateCryptoTable
        .then(function (data) {
            console.log(data)
            populateCryptoTable(data)
        })

        //catch method to log errors
        .catch(error => console.log(error))


    //function that populates the currency market section with data from the api
    function populateCryptoTable(data) {
        let market = [];
        let coinName = [];
        let lastPrice = [];
        let TwentyFourHourChange = [];
        let chart = [];
        let marketCap = [];

        data['data'].forEach((coin) => {
            market.push(coin.symbol);
            coinName.push(coin.name);
            lastPrice.push(coin.priceUsd);
            TwentyFourHourChange.push(coin.changePercent24Hr);
            chart.push(coin.vwap24Hr);
            marketCap.push(coin.marketCapUsd);
        })

        let cryptoTable = document.querySelector('#crypto-table-body')
        let add = "";

        for (let i = 0; i < coinName.length; i++) {
            add += "<tr>"
            add += "<td>" + market[i] + "</td>"
            add += "<td>" + coinName[i] + "</td>"
            add += "<td>$" + Math.round(lastPrice[i]).toFixed(3) + "</td>"
            add += "<td>" + Math.round(TwentyFourHourChange[i]).toFixed(3) + "</td>"
            add += "<td>" + Math.round(chart[i]).toFixed(3) + "</td>"
            add += "<td>$" + Math.round(marketCap[i]) + "</td>"

            // turn the 24hr price change price change either green or red
            if (TwentyFourHourChange[i] > 0) {
                add +=
                    "<td class = green-text>" + TwentyFourHourChange[i] + "</td>"
            } else {
                add +=
                    "<td class = red-text>" + TwentyFourHourChange[i] + "</td>"
            }
            add += "</tr>"
        }
        cryptoTable.innerHTML = add

    }





    //declare variables
    let newsItems = []

    //News API GET Request
    fetch('https://newsdata.io/api/1/news?apikey=pub_85111e53b643cfda4841a1cccecbb8fa3f37&q=crypto&language=en&category=business ')
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data.results)
            data.results.forEach(results => {
                newsItems.push({
                    title: results.title,
                    link: results.link
                })
                appendNews(newsItems)
            })

            console.log(newsItems)
        })
        .catch(err => console.log(err))
    console.log(newsItems)

    console.log(newsItems)
    let newsList = document.querySelector("ul#newslist")

    function appendNews(newsItems) {
        for (let i = 0; i < newsItems.length; i++) {
            let li = document.createElement("li")
            newsContent = `<a href="${newsItems[i].link} "target="_blank"> ${newsItems[i].title}</a>`
            li.innerHTML = newsContent
            newsList.appendChild(li)
        }
    }

    //Pin Notes Section 

    //Declare Variables
    const form = document.querySelector(".pin-notes")
    const tasks = document.querySelector('#tasks')


    form.addEventListener("submit", create)

    const input = document.querySelector("#input")

    function create(event) {
        event.preventDefault()
        fetch("http://localhost:3000/posts", {
            method: 'POST',
            body: JSON.stringify({
                text: input.value
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(function (response) {
            response.json().then(li)
        })
    }


    function li(input) {
        let listItem = document.createElement("li")
        listItem.innerHTML = input.text
        tasks.appendChild(listItem)
    }

})