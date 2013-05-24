# tribes/example/upload.py
from monkeys import BasicMonkey

class UploadMonkey(BasicMonkey):
    def run(self):
        # log in
        response = self.post(
            "/login.json",
            params={
                'username': "uploadmonkey",
                'password': "ookookaakaak",
            }
        )
        assert(response.json["status"] == "ok")

        # post an article
        response = self.post(
            "/contents.json",
            params={
                'title': "A test post by the upload monkey",
                'body': "Ook! Ook!",
            },
            status=201
        )
        my_article_id = response.json["id"]

        # update the article
        self.post(
            "/contents/%d.json" % my_article_id,
            params={
                'title': "An updated post by the upload monkey",
                'body': "Aak! Aak!",
            }
        )
