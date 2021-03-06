from models.model import Model
from pprint import pprint
from models.backlogs import BacklogsModel


class IssuesModel(Model):
    _fields = {"_id": None,
               "name": "",
               "description": "",
               "kind": "",
               "status": "",
               "sprint": None,
               "estimate": None
               }

    backlog = BacklogsModel()

    def __init__(self):
        super(IssuesModel, self).__init__()
        self._db.collection("backlog")

    def get_all_issues(self, backlog_id):
        """
        find backlog by id with all it's fields and return only field "issues"
        field "issues" is a list of dictionaries
        """
        document = self._db.select_one({"_id":backlog_id}, self.backlog._fields)
        return document[0]["issues"]

    def get_issue_by_id(self, backlog_id, issue_id):
        """
        get spesific "issue" ("issue" is a dictionary) from list of issues by it's _id
        """
        list_of_issues = self.get_all_issues(backlog_id)
        for item in list_of_issues:
            if item["_id"] == issue_id:
                return item

    def create_issue(self, backlog_id, issue):
        """
        parametre issue is a dictionary
        """
        push_dict = {"_id": self._counter.issue(),
                     "name": issue.get("name"),
                     "description": issue.get("description"),
                     "kind": issue.get("kind"),
                     "status": issue.get("status"),
                     "sprint": issue.get("sprint"),
                     "estimate": issue.get("estimate")
                     }
        self._db.push({"_id": backlog_id}, "issues", push_dict)
        return push_dict["_id"]

    def update_issue(self, backlog_id, issue_id, new_issue):
        pprint(new_issue)
        where = {"_id": backlog_id, "issues._id": issue_id}
        self._db.set(where, new_issue)


if __name__ == "__main__":
    pass
