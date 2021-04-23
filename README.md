# HistoricData
Get requests from FinancialModelingPrep.com for All US TICKERS Filtered with quote and volume data. 
You can run this node script to get all US symbols, and filter them how you wish based on several different parameters.
First part of the script gets all symbols across the globe for every exchange.
Second part of the script then filters the symbols to only the US market.
Third part then only filters the symbols based on Volume though it could be expanded to other parameters. 
My API key will expire at the end of this month and is only for use case example. 

This script could be improved with async functions and a lot fewer lines of code. 

If you want more objects displayed, console.log(l) on line 210 should return an example of what the objects look like and its values then on line 211, just add in the object var and a var to add more variables to the parm object. Or run the script once, let it populate and then go over the file, "quoteQualified.json" that was just populated and look at the object's vars and update on lines 211. 

Fully automated task that scales to any size symbol list 10,000 - infinity items, it doesnt care, it's fully automated. 
