# tribes/example/frontpage.py
from monkeys import BasicMonkey

class FrontpageMonkey(BasicMonkey):
    def run(self):
        self.get("/")
