public with sharing class PositionController {

    /**
     * Retrieves a position by its ID.
     * 
     * @param positionId The ID of the position to retrieve.
     * @return The position with the specified ID.
     */

    @AuraEnabled
    public static Position__c getPosition(String positionId){
        return[SELECT Id, Name, Location__c
        FROM Position__c WHERE Id = :positionId LIMIT 1];
    }

    /**
     * Retrieves a list of job applications for a position.
     * 
     * @param positionId The ID of the position for which to retrieve job applications.
     * @return A list of job applications for the specified position.
     */

    @AuraEnabled
    public static List<Job_Application__c> getJobApplications(String positionId){
        return[SELECT Id, Name, Candidate__r.Name,Candidate__r.First_Name__c, Candidate__r.Last_Name__c, Status__c
        FROM Job_Application__c WHERE Position__c =:positionId];
    }

    /**
     * Creates a new job application for a position.
     * 
     * @param positionId The ID of the position for which to create a job application.
     * @param candidateName The name of the candidate applying for the job.
     * @param status The status of the job application.
     * @return The newly created job application.
     */

    @AuraEnabled
    public static Job_Application__c createJobApplications(String positionId, String candidateName, String status){
        Job_Application__c jobApplication = new Job_Application__c(
            Position__c = positionId,
            Candidate__c = candidateName,
            Status__c = status
        );

        insert jobApplication;
        return jobApplication;
    }

}