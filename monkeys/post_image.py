# tribes/civicboom/post_image.py
from tribes.civicboom import CivicboomMonkey

class PostImageMonkey(CivicboomMonkey):
    def run(self):
        self.log_in_as("unittest")

        # create an article
        response = self.post(
            "/contents.json",
            params={
                '_authentication_token': self.auth_token,
                'title': "Attachment test",
                'type': "draft",
                'content': "Media Incoming",
            },
            status=201
        )
        my_article_id = response.json["data"]["id"]

        # upload an attachment
        self.post(
            "/contents/%d.json" % my_article_id,
            params={
                '_method': 'PUT',
                '_authentication_token': self.auth_token,
                'media_caption': "A random image",
                'media_credit': "Test Monkey",
            },
            upload_files = [
                ("media_file", "landscape.png", self.generate_image((400, 300), 42))
            ],
        )

        # publish the article
        self.post(
            "/contents/%d.json" % my_article_id,
            params={
                '_authentication_token': self.auth_token,
                '_method': 'PUT',
                'type': "article",
            }
        )
