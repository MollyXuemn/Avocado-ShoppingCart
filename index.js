const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify'); //npm pk: slug is the last part of the url that identify the website that is displayed
const replaceTemplate = require('./modules/replaceTemplate');


TODO: 
/* const textIn = fs.readFileSync('./txt/input.txt','utf-8');
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`; //use template string to avoid 'text' + ${textIn}

//output the textOut into a new file
fs.writeFileSync('./txt/output.txt', textOut);
//check the file is created
console.log("flie written!")
 */
//Non- blocking, asynchronous way
/* 
fs.readFile('./txt/start.txt', 'utf-8',(err, data1) => {//data: Contents of the file.
    if(err) return console.log('ERROR!')//print just error
    fs.readFile(`./txt/${data1}.txt`, 'utf-8',(err, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8',(err, data3) => {
            console.log(data3);

            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`,'utf-8', err =>{
                console.log("flie written!");
        })
        });
    });
});
//first loaded
console.log("will read the file");
 */


//SERVER, get executed each time if user request
//only executed once we start the program(以防重复循环加载)
var tempOverview = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    'utf-8'
  );
  var tempCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    'utf-8'
  );
  var tempProduct = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    'utf-8'
  );
  
  var data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
  const dataObj = JSON.parse(data);
  
  const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
  console.log(slugs);
  
  const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
  
    // Overview page
    if (pathname === '/' || pathname === '/overview') {
      res.writeHead(200, {
        'Content-type': 'text/html'
      });
  
      const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
      const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
      res.end(output);
  
      // Product page
    } else if (pathname === '/product') {
      res.writeHead(200, {
        'Content-type': 'text/html'
      });
      const product = dataObj[query.id];
      const output = replaceTemplate(tempProduct, product);
      res.end(output);
  
      // API
    } else if (pathname === '/api') {
      res.writeHead(200, {
        'Content-type': 'application/json'
      });
      res.end(data);
  
      // Not found
    } else {
      res.writeHead(404, {
        'Content-type': 'text/html',
        'my-own-header': 'hello-world'
      });
      res.end('<h1>Page not found!</h1>');
    }
  });
  
  server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
  });
  