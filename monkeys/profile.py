# tribes/civicboom/profile.py
from tribes.civicboom import CivicboomMonkey

class ProfileMonkey(CivicboomMonkey):
    def run(self):
        self.log_in()
        self.get("/profile")
