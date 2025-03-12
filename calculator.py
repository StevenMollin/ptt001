from decimal import Decimal,ROUND_DOWN
import json

from getfile import get_file, modify

def online_sheet():
    get_file()

    sheet = json.load(open('scores.json', 'r'))

    return modify(sheet)

def online_rating():
    sheet = json.load(open('scores.json', 'r'))
    best = 0
    recent = 0

    for num in sheet["value"]["best_rated_scores"]:
        best += round(num["rating"],2)

    for num in sheet["value"]["recent_rated_scores"]:
        recent += round(num["rating"],2)

    rating = Decimal((best + recent) / 40)
    best = Decimal(best/30)
    recent = Decimal(recent/10)

    rating = rating.quantize(Decimal('0.000'),rounding=ROUND_DOWN)
    best = best.quantize(Decimal('0.000'),rounding=ROUND_DOWN)
    recent = recent.quantize(Decimal('0.000'),rounding=ROUND_DOWN)

    return {"best":float(best), "recent":float(recent),"rating":float(rating)}