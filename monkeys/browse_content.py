# tribes/civicboom/browse_content.py
from tribes.civicboom import CivicboomMonkey

import random

class BrowseContentMonkey(CivicboomMonkey):
    def run(self):
        r = self.get("/contents.json")
        ids = [c['id'] for c in r.json['data']['list']['items']]

        self.get("/contents/%d" % (random.choice(ids), ))
        self.get("/contents/%d" % (random.choice(ids), ))
        self.get("/contents/%d" % (random.choice(ids), ))
        self.get("/contents/%d" % (random.choice(ids), ))
        self.get("/contents/%d" % (random.choice(ids), ))
