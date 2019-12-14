import wikipediaapi
import json
from collections import OrderedDict

wiki=wikipediaapi.Wikipedia('ko')

day = 1
month = 1

for month in range(1, 13, 1):
    if month==2 :
        bound=29
    elif month<=7 and month%2==1 :
        bound=31
    elif month>=8 and month%2==0 :
        bound=31
    else :
        bound=30

    for day in range(1,bound+1, 1) :
        location ="wikidata/"+str(month)+"/data_"+str(month)+"_"+str(day)+".txt"
        f=open(location, "w")
        p_wiki = wiki.page(str(month)+'월 '+str(day)+'일')
        print("Page - Exists %s" % p_wiki.exists())
        print("Page - Title: %s" % p_wiki.title)
        text = p_wiki.text
#        location = "wikidata/data_"+str(month)+"_"+str(day)+".txt"
#        f = open(location, "w")
        f.write(text)
        f.close()

#p_wiki = wiki.page(str(month)+'월 '+str(day)+'일')
#print(p_wiki.text) # test print
#text = p_wiki.text

#location = "wikidata/data_"+str(month)+"_"+str(day)+".txt"
#f = open(location, 'w')
#f.write(text)
#f.close()

#f = open("data_"+month+"_"+day+".txt", 'r')
#for line in f:
#	bound = line[:10].find('년')
#	if bound > 0:
#		year = line[:bound+1]
#		print(year)
#		# 데이터
#		data = line[bound+1:]
#		print(data)

#print("end of crawling")

# 1,3,5,7,8,10,12 ==> 31 days
# 4,6,9,11 ==> 30 days
# 2 ==> 29 days

f.close()
