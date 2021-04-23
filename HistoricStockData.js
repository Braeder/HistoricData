const apikey = 'apikey=e48aa0f3e7acb68c7002975874fe4a24'
const fs = require('fs')
const https = require('https')


const options = {
  hostname: 'financialmodelingprep.com',
  port: 443,
  path: '/api/v3/available-traded/list?'+ apikey,
  method: 'GET'
}

const req = https.request(options, (res) => {
   var dataQuene = ""
  res.on('data', (d) => {
     dataQuene += d 

  })
  res.on("end", function () {
 
    
  fs.writeFile('./JSON/symbols.json', dataQuene, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully Downloaded File')
        sortSymbols()
    }
})
})
})

req.on('error', (error) => {
  console.error(error)
})

req.end()

function sortSymbols(){
let rawdata = fs.readFileSync('./JSON/symbols.json');
let result 
a = JSON.parse(rawdata)

trasharr = []
filteredSymbol = []
 console.clear()
 a.some((array) => {
         filteredsym = {
         "symbol" : array.symbol,
         "name" : array.name,
         "price" : array.price,
         "exchange" : array.exchange
         }
         filteredSymbol.push(filteredsym)
  })

       result = getNas()
   
      function getNas (){

      result = filteredSymbol.filter(function (obj) {
      return obj.exchange === 'NasdaqGS';
      });
      trasharr.push(result)
      
       
 
      result = filteredSymbol.filter(function (obj) {
      return obj.exchange === 'Nasdaq';
      });
      trasharr.push(result)
 
    
      result = filteredSymbol.filter(function (obj) {
      return obj.exchange === 'NYSE American';
      });
      trasharr.push(result)
     
      a.every((array) => {
      result = filteredSymbol.filter(function (obj) {
      return obj.exchange === 'BATS Exchange';
      });
      trasharr.push(result)
      })

      result = filteredSymbol.filter(function (obj) {
      return obj.exchange === 'NasdaqCM';
      });
      trasharr.push(result)

      result = filteredSymbol.filter(function (obj) {
      return obj.exchange === 'NYSE';
      });
      trasharr.push(result)


      result = filteredSymbol.filter(function (obj) {
      return obj.exchange === 'NASDAQ Capital Market';
      });
      trasharr.push(result)
    
      result = filteredSymbol.filter(function (obj) {
      return obj.exchange === 'New York Stock Exchange';
      });
      trasharr.push(result)
     
  
      result = filteredSymbol.filter(function (obj) {
      return obj.exchange === 'NYSE Arca';
      });
      trasharr.push(result)
     
    
    
        result = filteredSymbol.filter(function (obj) {
        return obj.exchange ===  "Nasdaq Global Select";
        });
        trasharr.push(result)
        
    
      }// end of Sort Exchange Function 


 fs.writeFile('./JSON/filteredsymbols.json', JSON.stringify(trasharr.slice(1), null,2), err => {
  if (err) {
      console.log('Error writing file', err)
  } else {
      console.log('Successfully Sorted File')
      volumegetter()
  }
})
} // end of sort

function volumegetter(){
let filteredData = fs.readFileSync('./JSON/filteredsymbols.json');
let symbolArr = []
f = JSON.parse(filteredData)
let refilterQutoe = []


f.forEach((array) => {
  array.forEach((item) => {
    tickers = item.symbol
    symbolArr.push(tickers)
  })
}); // end of forloop //sorts filtered ticker data into an array of cleaned ticker symbols only


let firstSet
let secondSet
let countArr
let tickerBlock

let e = 0
let i = 1
let a = 0
let quote = []
let size

let final = []
let done1 = false
let numb
finalArray = []

if (e == 0) {
  getPositionArr()
}

function getPositionArr() {
  countArr = []
  let startPos = 0
  let countSize = 800 //size between range
      size = countSize
  for (startPos; startPos < symbolArr.length; startPos += countSize) {
    countArr.push(startPos)
  } // gets initial positions for length of array and builds a range incrementing up by countSize
}

if (e == 0) {
  tickerBlockfun()
} else {
  //do not a damn thing
} // Triggers function at start of script

function tickerBlockfun() {
  firstSet = countArr.slice(e)[0] // first range parameter
  secondSet = countArr.slice(i)[0] // second range parameter
 
  if (i <= countArr.length) { // when conventional tickerblocks ranges have ended

    if (secondSet == undefined) {
      firstSet = countArr.slice(-1)[0]
      secondSet = symbolArr.length
     } // wraps up the straggler ticker symbols that dont fit nicely into a Tickerblock

    tickerBlock = symbolArr.slice(firstSet, secondSet)
    getQuote(tickerBlock)
  }
} // loads range of ticker data into the Ticker Block

function pushData(data1) {
quote.push(data1)
const parsedData = JSON.parse(data1)
parsedData.forEach(el => finalArray.push(el));
final = JSON.stringify(finalArray)
 
if (a == countArr.length && done1 != true) {
let h = final;
l = JSON.parse(h)
l.forEach((array) => {
     t = array.symbol,
    aV = array.avgVolume
    yC = array.previousClose
        parm = {
          t,
          aV,
          yC
        
    }
if(aV > 1000000 && yC > 4.00){
  data = [JSON.stringify(parm)]
   refilterQutoe.push(data)
}

}); 
    let refineded = refilterQutoe
    fs.writeFile('./JSON/quoteQualified.json', '['+ refineded + ']', err => {
    console.log('Successfully  Filed')
    })

  }
} // recieve the data and pushes it into an array then when complete, dumps into a json file


function getQuote(tickerBlock) {
   let percentTocomplete = (quote.length/(symbolArr.length/size))*100
  numb =  percentTocomplete

  let finalnumb = numb.toFixed(2)
 
  const https = require('https')
  const options = {
    hostname: 'financialmodelingprep.com',
    port: 443,
    path: '/api/v3/quote/' + tickerBlock + '?'+ apikey,
    method: 'GET'
  }
  const req = https.request(options, (res) => {
    let data1 = ''
    res.on('data', (data) => {
      data1 += data
    })

    res.on("end", function() {
      console.log("Message Received", a++)
      e++
      i++
      pushData(data1)
      tickerBlockfun()
 
    })
  })
  console.clear()
  console.log("Current Array Position", e, i)
  console.log("---------------------------------")
  console.log("First Range", firstSet)
  console.log("Second Range", secondSet)
  console.log("---------------------------------")
  console.log("Quote Length", quote.length)
  console.log("Symbol Length", symbolArr.length/size)
  console.log("Successful messages received:", a)
  console.log("---------------------------------")
  console.log("Percent Complete",finalnumb)
    req.on('error', (error) => {
    console.error("I am error:", error)
  })
  req.end()
}
}
