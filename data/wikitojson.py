import json
from collections import OrderedDict

month = 1
day = 1
month_list = OrderedDict()
day_list = OrderedDict()

category = ["사건", "문화", "탄생", "사망", "기념일"]
cat_idx = 0

for month in range(1, 13, 1):
    month_list[str(month)] = OrderedDict()
    if month==2 :
        bound=29
    elif month<=7 and month%2==1 :
        bound=31
    elif month>=8 and month%2==0 :
        bound=31
    else :
        bound=30

    for day in range(1,bound+1, 1) :
        cat_idx=0
        cur_cat=0
        month_list[str(month)][str(day)] = []
    #    for index in category :
    #        month_list[str(month)][str(day)][index] = []
        location ="wikidata/"+str(month)+"/data_"+str(month)+"_"+str(day)+".txt"
        f = open(location, "r")

        for line in f:
            if line[len(line)-1] == '\n':
                line = line[:len(line)-1]
            yr = line[:6].find("년", 0, 10)
            if yr == -1 and cur_cat == 4 :
                if "관련 항목" in line :
                    break;
                elif len(line) > 5 :
                    month_list[str(month)][str(day)].append({'category':category[cur_cat], 'year':'-1','content':line})
            elif yr == -1 and cur_cat < 4:
                for cat_idx in range(0,5,1) :
                    if category[cat_idx] in line[:5] :
                        cur_cat = cat_idx
                        # print(cur_cat)
                        break;
            elif yr>0 :
                if len(line) > 5:
                        month_list[str(month)][str(day)].append({'category':category[cur_cat], 'year':line[:yr],'content':line[yr+2:len(line)]})

        # for line in f:
        #     if category[cat_idx] in line and cat_idx<4:
        #         cat_idx += 1
        #     elif line[:4].isdigit() or '년' in line[:10]:
        #         month_list[str(month)][str(day)][category[cat_idx-1]].append(line)
        #     elif cat_idx == 4:
        #         if "관련 항목" in line : break;
        #         if len(line)>5:
        #             month_list[str(month)][str(day)][category[cat_idx]].append(line)

        f.close()

with open('wikiday4.json', 'w', encoding="utf-8") as file:
    file.write(json.dumps(month_list, ensure_ascii=False, indent="\t"))
file.close()
