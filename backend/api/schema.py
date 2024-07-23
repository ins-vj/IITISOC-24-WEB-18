from drf_spectacular.openapi import AutoSchema
from inflection import humanize, titleize

class CustomAutoSchema(AutoSchema):
    def get_tags(self):
        # Use the view's name or a custom attribute to generate a tag
        view_name = self.view.__class__.__name__
        if hasattr(self.view, 'schema_tags'):
            tags = self.view.schema_tags
        else:
            tags = [titleize(view_name)]
        return tags
