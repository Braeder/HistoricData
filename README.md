# HistoricData
Get requests from FinancialModelingPrep.com for All US TICKERS Filtered. 
You can run this node script to get all US symbols, and filter them how you wish based on several different parameters.
First part of the script gets all symbols across the globe for every exchange.
Second part of the script then filters the symbols to only the US market.
Third part then only filters the symbols based on Volume though it could be expanded to other parameters. 
My API key will expire at the end of this month and is only for use case example. 

If you want more objects displayed, console.log(l) on line 210 should return an example of what the object looks like and its values then  
on line 211, just add in the string and a var to add more variables to the parm object. 

I hope you like it and enjoy it! This script right here caused me to lose access to stackover flow from asking question. Thank you stackover, if you all had the ability to see this work, you would ultimately downvote it.

But I didnt need your help with it :) So thank you. Fully automated task that scales to any size symbol list 10,000 - 200,000 items, it doesnt care it's fully automated. 
