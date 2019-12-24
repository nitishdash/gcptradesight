let axios = require('axios');
let cheerio = require('cheerio'); 
let express = require('express');
let fs = require('fs'); 

var app = express();

var server_port = server.address().port || 8080
var server_ip_address = server.address().address || '127.0.0.1'
 
app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});

var stockNews = [];
var stockNewsUrls = [];
var intArt = [];
var stakeSale = [];
var sme = [];
var ipo = [];
var comment = [];
var research = [];
var commodities = [];
var general = [];
var finalStockNews = [];

axios.get('https://www.equitybulls.com/')
	.then((response) => {
		if(response.status === 200) {
		      const html = response.data;
		      const $ = cheerio.load(html); 

			  var flag=0;	

			$('tbody tr td table tbody tr td table tbody tr td table tbody tr td table tbody tr td ').each(function(i, elem){
				var a = $(this);
				if(a.hasClass('newsheader')) {
					if(!(a.text()).toLowerCase().includes('headlines')||!(a.text()).toLowerCase().includes('headlines')) {
						// console.log(a.text());
						if(a.text().toLowerCase().includes('report')){
							flag=1;
							return true;
						}
						if(a.text().toLowerCase().includes('interesting')){
							flag=2;
							return true;
						}	
						if(a.text().toLowerCase().includes('stake')){
							flag=3;
							return true;
						}
						if(a.text().toLowerCase().includes('sme')){
							flag=4;
							return true;
						}
						if(a.text().toLowerCase().includes('ipo')){
							flag=5;
							return true;
						}
					}

					else {	//has headlines
						return true;
					}

				}

				if(flag == 1) {
					if(!a.children().text()=='') {
						finalStockNews.push({
							'title':a.children().text(),
							'url':'https://www.equitybulls.com'+a.children().attr('href')
						});
					} 
				}
				if(flag == 2) {
					if(!a.children().text()=='') {
						intArt.push({
							'title':a.children().text(),
							'url':'https://www.equitybulls.com'+a.children().attr('href')
						});
					}
				}
				if(flag == 3) {
					if(!a.children().text()=='') {
						stakeSale.push({
							'title':a.children().text(),
							'url':'https://www.equitybulls.com'+a.children().attr('href')
						});
					} 
				}
				if(flag == 4) {
					if(!a.children().text()=='') {
						sme.push({
							'title':a.children().text(),
							'url':'https://www.equitybulls.com'+a.children().attr('href')
						});
					}
				}
				if(flag == 5) {
					if(!a.children().text()=='') {
						ipo.push({
							'title':a.children().text(),
							'url':'https://www.equitybulls.com'+a.children().attr('href')
						});
					} 
				}

				// console.log(i+' '+a);
			});
			console.log(finalStockNews.length);
		}
	}, (error) => console.log(error));

	
app.get("/equitybulls/stocknews", (req, res, next) => {
	res.json((finalStockNews));
});

app.get("/equitybulls/interestingnews", (req, res, next) => {
	res.json((intArt));
});

app.get("/equitybulls/stakesell", (req, res, next) => {
	res.json((stakeSale));
});

app.get("/equitybulls/sme", (req, res, next) => {
	res.json((sme));
});

app.get("/equitybulls/ipo", (req, res, next) => {
	res.json((ipo));
});

app.get("/", (req, res, next) => {
	res.json("HELLOW!!!!! You're in cloud!");
});

