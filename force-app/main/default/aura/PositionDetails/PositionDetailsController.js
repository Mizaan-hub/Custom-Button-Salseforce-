({

    getUrlParameter : function(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    },
    
    doInit : function(component, helper) {
        console.log("hey");
        //Retrieve the positionId from the url parameters
        var pageRef = component.get("v.pageReference");
        console.log(component.get("v.pageReference").state.testAttribute);

        //URL EXAMPLE /lightning/cmp/c__PositionDetails?c__positionId={a00GA000074XhEN}
        // https://aqxolt61-dev-ed.develop.my.salesforce.com/{a00GA000074XhEN}

        var positionId = pageRef.state.c__positionId;
        component.set("v.positionId",positionId);
        
        //Retrieve the position details
        helper.fetchPositionDetails(component);
        
        //Retrieve the job applications
        helper.fetchJobApplications(component, positionId);
    },

    

    showNewJobApplicationsForm : function(component){
        component.set("v.showNewJobApplicationsForm",true);
        console.log("hey there");
    },


    handleSubmit : function(component, event){
        // var recordEditForm = component.find("recordEditForm");
        // recordEditForm.save();
        event.preventDefault(); //to prevent from default submit
        var fields = event.getParam('fields');
        fields.Position__c = component.get("v.positionId");
        component.find('recordEditForm').submit(fields);
    },

    handleSuccess : function(component, event){
        var JobApplication = event.getParam("response");

        //Update the job applications list
        var jobApplications = component.get("v.jobApplications");
        jobApplications.push(JobApplication);
        component.set("v.jobApplications",jobApplications);

        //Reset the form
        component.set("v.newJobApplication",{'sobjectType' : 'Job_Application__c'});
        component.set("v.showNewJobApplicationForm",false);
    },

    handleError: function(event){

        var errors = event.getParam('error');
        console.error("Error creating a new Job Application: ",errors);
    }
})
