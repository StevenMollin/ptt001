import requests
import json

def get_file():
    with open('cookie.json', 'r') as file:
        cks = json.load(file)

    cookies = { 'ctrcode': 'CN', 'sid': cks["sid"], }
    headers = { 'accept': 'application/json, text/plain, */*', 'accept-language': 'zh-CN,zh;q=0.9', 'cache-control': 'no-cache', 'origin': 'https://arcaea.lowiro.com', 'pragma': 'no-cache', 'priority': 'u=1, i', 'referer': 'https://arcaea.lowiro.com/', 'sec-ch-ua': '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"', 'sec-ch-ua-mobile': '?0', 'sec-ch-ua-platform': '"Windows"', 'sec-fetch-dest': 'empty', 'sec-fetch-mode': 'cors', 'sec-fetch-site': 'same-site', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36', 'cookie': cks['cookie'] , }
    response = requests.get('https://webapi.lowiro.com/webapi/score/rating/me', cookies=cookies, headers=headers,verify=False)

    with open('scores.json', 'w') as outfile:
        outfile.truncate(0)
        json.dump(response.json(), outfile)
        outfile.close()

    return response.json()

def modify(file):
    file = file["value"]
    diff = {'0':'PST','1':'PRS','2':'FTR','3':'BYD','4':'ETR'}

    for temp in file["best_rated_scores"]:
        del temp["modifier"],temp["perfect_count"],temp["near_count"],temp["miss_count"],temp["clear_type"]

        temp["title"] = temp["title"]["en"]
        temp["rating"] = round(temp["rating"],4)
        temp["difficulty"] = diff[str(temp["difficulty"])]

    for temp in file["recent_rated_scores"]:
        del temp["modifier"],temp["perfect_count"],temp["near_count"],temp["miss_count"],temp["clear_type"]

        temp["title"] = temp["title"]["en"]
        temp["rating"] = round(temp["rating"], 4)
        temp["difficulty"] = diff[str(temp["difficulty"])]

    return file


if __name__ == '__main__':
    print(modify(get_file()))