import json
from collections import OrderedDict


jsondata = open("wikiday4.json").read()
data = json.loads(jsondata)
#print(data["1"]["1"])
month_list = OrderedDict()
day_list = OrderedDict()

month = 1
day = 1

def bubblesort(A):
    length = len(A)
    for i in range(0, length, 1):
            for j in range(0, length-i-1, 1):
                if int(A[j]['year']) > int(A[j+1]['year']):
                    A[j], A[j+1] = A[j+1], A[j]
    return A

for month in range(1, 13, 1):
    if month==2 :
        bound=29
    elif month<=7 and month%2==1 :
        bound=31
    elif month>=8 and month%2==0 :
        bound=31
    else :
        bound=30
    month_list[str(month)] = OrderedDict()

    for day in range(1, bound+1, 1):
        month_list[str(month)][str(day)] = []
        length = len(data[str(month)][str(day)])
    #print(length)
        sort_this = data[str(month)][str(day)]
        sort_this = bubblesort(sort_this)
        month_list[str(month)][str(day)] = sort_this


with open('sorted-wiki3.json', 'w', encoding="utf-8") as file:
    file.write(json.dumps(month_list, ensure_ascii=False, indent="\t"))
file.close()
