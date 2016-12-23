#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import logging
import requests
import gmplot
import webbrowser
import matplotlib.pyplot as plt
import numpy as np

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

def get_waze_route(start_coords, end_coords):
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
                "nPaths": 100,
                "options": "",
        }

        response = requests.get(WAZE_URL + routing_req, params=url_options)

        response_json = response.json()

        if response_json.get("error"):
                print('ERROR')
        if response_json.get("alternatives"):
                return response_json['alternatives'][5]['response']
        return response_json['response']

def hrs_to_sec(sec):
	return (sec / (60.00*60.00))

def m_to_miles(m):
	return (m / 1000.00)*0.621371

def get_route_info(r):
        """Calculate route info."""

        results = r['results']

        total_time = 0
        total_distance = 0
	node = 0 

	route = {} 
	lats = [] 
	lons = [] 

        for segment in results:
		this_time = segment['crossTime']
                this_distance = segment['length']

                total_time += this_time
                total_distance += this_distance
                 
		this_time_hrs = hrs_to_sec(this_time)
                this_distance_miles = m_to_miles(this_distance)
		this_speed = this_distance_miles / this_time_hrs

		path = segment['path']
           
		#print 'Node: ', node, ' Lat: ', path['y'], 'Lon: ', path['x'], ' at ', this_speed, 'mph for ', this_distance_miles , ' miles for ', this_time, 's' 

		node = node + 1
		route[node] = {} 
		route[node]['location'] = (path['y'], path['x'])
		lats.append(path['y'])
		lons.append(path['x'])
		route[node]['time'] = this_time
		route[node]['speed'] = this_speed
		route[node]['distance'] = this_distance_miles
		route[node]['rel_distance'] = m_to_miles(total_distance)		

        route_distance = m_to_miles(total_distance)

	route['total_time'] = total_time       
	route['total_distance'] = route_distance
	route['lats'] = lats
	route['lons'] = lons
	route['node_count'] = node

        print 'Total Route Time (mins): ', total_time/60.00
        print 'Total Route Distance (miles)', route_distance

        return route

def main():

	from_address = 'University of Washington, Seattle, WA, United States'
	to_address = 'Legend House, Roosevelt Way Northeast, Seattle, WA, United States'
	url = "mymap.html"


	start_coords = address_to_coords(from_address) 
	end_coords = address_to_coords(to_address) 
	gmap = gmplot.GoogleMapPlotter(start_coords["lat"], start_coords["lon"], 13)

	print(start_coords)
	print(end_coords)

	route = get_waze_route(start_coords, end_coords)

	with open('raw_route_data.txt', 'w') as outfile:
	     json.dump(route, outfile, sort_keys = True, indent = 4, ensure_ascii=False)

	route_info = get_route_info(route)

	lats = route_info['lats']
	lons = route_info['lons']
	
	gmap.plot(lats, lons, 'cornflowerblue', edge_width=6)
	gmap.draw(url)
	
	webbrowser.open(url,new=2)

	distances = []
	times = [] 
	speeds = [] 
	node_count = route_info['node_count'] 
	for i in range(1, node_count):
		distances.append(route_info[i]['rel_distance'])
		speeds.append(route_info[i]['speed'])
		times.append(route_info[i]['time'])

	plt.figure() 
	plt.subplot(1, 1, 1)

	plt.plot(distances, speeds)

	plt.show()

main()



