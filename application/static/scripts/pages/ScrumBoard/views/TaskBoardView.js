define(["text!pages/ScrumBoard/templates/TaskBoardView.html",
        "pages/ScrumBoard/collections/Issues",
        "pages/ScrumBoard/models/Issue",
        "pages/ScrumBoard/views/IssueView",
        "pages/ScrumBoard/collections/Subissues",
        "pages/ScrumBoard/models/Subissue",
        "pages/ScrumBoard/views/SubissueView"],

	function(taskBoardTemplate, Issues, Issue, IssueView, Subissues, Subissue, SubissueView){
        return Backbone.View.extend({ 

            initialize: function(options){
                this.issues = new Issues();
                this.subissues = new Subissues();
                this.filteredSub = {};
                
            },

            render: function() {
                var that = this;
                this.$el.html(taskBoardTemplate);
                this.issues.fetch({
                    success: function (collection, response, options) {
                        //debugger;
                        that.subissues.fetch({
                            success: function(data, response, options) {
                                collection.each(function(model) {
                                    that.filteredSub[model.id] = data.where({"parent": model.id});
                                });
                                that.renderAll();
                            }
                        });
                    }    
                });
                        
                return this;
			},

			renderAll: function() {
                //debugger;
			    this.issues.each(function(issue) {
			        var issueView = new IssueView({
			            model: issue
		            });
                    if (issue.get("status") == "to do") {
                        this.$(".todo").append(issueView.render().el);
                    }
                    if (issue.get("status") == "doing") {
                        this.$(".doing").append(issueView.render().el);
                    }
                    if (issue.get("status") == "done") {
                        this.$(".done").append(issueView.render().el);
                    }
                    _.each(this.filteredSub[issue.id], function(subissue){
                        var subissueView = new SubissueView({
                            model: subissue
                        });
                        if (subissue.get("status") == "to do") {
                            this.$(".todo").append(subissueView.render().el);
                        }
                        if (subissue.get("status") == "doing") {
                            this.$(".doing").append(subissueView.render().el);
                        }
                        if (subissue.get("status") == "done") {
                            this.$(".done").append(subissueView.render().el);
                        }
                    }, this);
			    }, this);
			}
        });
    }
);	
