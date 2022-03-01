import json, requests

def get_data():
    path = "csv_to_json/data/tour_in_json.json"
    with open(path) as file:
        lines = file.readlines()
        return json.loads(lines[0])


def insert():
    data = get_data()
    req_url = "http://localhost:5000/api/v2/tour_dates"

    for elem in data:
        json_data = {
            "showDate": elem["api_date"],
            "show": elem["show"],
            "scenary": elem["escenario"],
            "place": elem["lugar"]
        }
        r = requests.post(req_url, data=json_data)

        print(elem["show"], ", ", elem["escenario"], " - ", r.status_code)


if __name__ == "__main__":
    # insert()
    data = get_data()
    print(data)
    print(len(data))
    