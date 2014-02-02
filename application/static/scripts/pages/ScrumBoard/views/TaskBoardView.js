define(["text!pages/ScrumBoard/templates/TaskBoardView.html"],
	function(taskBoardTemplate){

    return Backbone.View.extend({
    	
    	template: _.template(taskBoardTemplate), 

		initialize: function(options){
			    },

		render: function() {
			   this.$el.append(this.template({text: "Super Issue"}));
			return this;
			}
                
 	    });
});	
