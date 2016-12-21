#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import logging
import requests

WAZE_URL = "https://www.waze.com/"

def address_to_coords(address):
        """Convert address to coordinates"""

        get_cords = "SearchServer/mozi?"
        url_options = {
                "q": address,
                "lang": "eng",
                "origin": "livemap",
                "lon": "19.040",
                "lat": "47.498"
        }
        response = requests.get(WAZE_URL + get_cords, params=url_options)
        response_json = response.json()[0]
        lon = response_json['location']['lon']
        lat = response_json['location']['lat']
        return {"lon": lon, "lat": lat}

def get_route(start_coords, end_coords):
        """Get route data from waze"""

        routing_req = "RoutingManager/routingRequest"

        url_options = {
                "from": "x:%s y:%s" % (start_coords["lon"], start_coords["lat"]),
                "to": "x:%s y:%s" % (end_coords["lon"], end_coords["lat"]),
                "at": 0,
                "returnJSON": "true",
                "returnGeometries": "true",
                "returnInstructions": "true",
                "timeout": 60000,
                "nPaths": 3,
                "options": "",
        }
        response = requests.get(WAZE_URL + routing_req, params=url_options)
        print WAZE_URL, routing_req, url_options
        response_json = response.json()
        if response_json.get("error"):
                print('ERROR')
        if response_json.get("alternatives"):
                return response_json['alternatives'][0]['response']
        return response_json['response']

def calc_route_info(route):
        """Calculate route info."""

        results = route['results']
        time = 0
        distance = 0
	node = 0 
	r = {} 
        for segment in results:
		this_time = segment['crossTime']
                this_distance = segment['length']
                time += this_time
                distance += this_distance

		this_time_hrs = this_time / (60.00*60.00)
                this_distance_miles = (this_distance / 1000.00)*0.621371
		this_speed = this_distance_miles / this_time_hrs
		path = segment['path']
		#print  path['y'], ', ', path['x']               
		print 'Node: ', node, ' Lat: ', path['y'], 'Lon: ', path['x'], ' at ', this_speed, 'mph for ', this_distance_miles , ' miles for ', this_time, 's' 
		node = node + 1
		r[node] = (path['y'], path['x'])

        route_time = time / 60.00
        route_distance = distance / 1000.00
        
        print 'Total Route Time (mins): ', route_time
        print 'Total Route Distance (miles)', route_distance*0.621371 

        return route_time, route_distance

def main():

	from_address = 'University of Washington, Seattle, WA, United States'
	to_address = 'Legend House, Roosevelt Way Northeast, Seattle, WA, United States'

	start_coords = address_to_coords(from_address) 
	end_coords = address_to_coords(to_address) 

	print(start_coords)
	print(end_coords)

	route = get_route(start_coords, end_coords)


	with open('raw_route_data.txt', 'w') as outfile:
	     json.dump(route, outfile, sort_keys = True, indent = 4, ensure_ascii=False)

	calc_route_info(route)
	

main()



