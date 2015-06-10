# -*- coding: utf-8 -*-
"""
Created on Tue Jun 09 17:12:28 2015

@author: Besitzer
"""
import json
import requests
url = 'http://backstage-api.openstate.eu/v0/search'
data = '{"query": "leenstelsel","facets": {"collection": {},"date": {"interval": "day"}},"filters": {"media_content_type": {"terms": ["image/jpeg"]}},"size": 1}'
response = requests.post(url, data=data)

js_data  = json.loads(response.content)
print data

