({
    fetchPositionDetails : function(component) {
        // get the action to fetch position details
        var action = component.get("c.getPosition");

        // set the position id as a parameter for the action
        action.setParams({
            "positionId" : component.get("v.positionId")
        });
        
        // set a call back function to handle the response
        action.setCallback(this, function(response) {
            var state = response.getState();
        
            if (state === "SUCCESS") {
                var position = response.getReturnValue();
                // set the position details in the compnent
                component.set("v.position", position);
            }
            else{
                console.error("Failed to fetch position details: "+response.getError());
            }
        });
        // enqueue action to be executed
        $A.enqueueAction(action);
    },


    fetchJobApplications : function(component) {
        // to fetch job applications
        var action = component.get("c.getJobApplications");
        // setting position id as a parameter for the action
        action.setParams({
            "positionId" : component.get("v.position")
        });

        // call back function to handle the responce
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                var jobApplications = response.getReturnValue();
                // set job applications in compoents
                component.set("v.jobApplications", jobApplications);
        
                    }
                    else{
                        console.error("Failed to fetch job applications: "+response.getError());
                    }
                });
                // enqueue action
                $A.enqueueAction(action);
            },
})
