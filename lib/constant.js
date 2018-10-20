/********************************** common validations Configuration *****************************/
errorMessages = new Object();

validationJSON = [
    {
        selector: ".validationRequired",
        attributes: [
            { name: "data-parsley-required", value: true },
            { name: "data-parsley-required-message", value: function () { var message = "This field is required"; if (typeof errorMessages[$(this).attr("Name")] != "undefined" && typeof errorMessages[$(this).attr("Name")].requiredmessage != "undefined") { message = errorMessages[$(this).attr("Name")].requiredmessage; } return message; } }
        ]
    },
    {
        selector: ".validationType",
        attributes: [
            { name: "data-parsley-type-message", value: function () { var message = "Please enter valid data"; if (typeof errorMessages[$(this).attr("Name")] != "undefined" && typeof errorMessages[$(this).attr("Name")].typemessage != "undefined") { message = errorMessages[$(this).attr("Name")].typemessage; } return message; } }
        ]
    },
    {
        selector: ".validationEqualTo",
        attributes: [
            { name: "data-parsley-equalto", value: function () { return $(this).attr("euqalTo"); } },
            { name: "data-parsley-equalto-message", value: function () { var message = "Please enter data with euqalTo field"; if (typeof errorMessages[$(this).attr("Name")] != "undefined" && typeof errorMessages[$(this).attr("Name")].euqalToMessage != "undefined") { message = errorMessages[$(this).attr("Name")].euqalToMessage; } return message; } }
        ]
    },
    {
        selector: ".validationNumber",
        attributes: [
            { name: "data-parsley-type", value: "number" },
            { name: "data-parsley-type-message", value: function () { var message = "Please enter valid number"; if (typeof errorMessages[$(this).attr("Name")] != "undefined" && typeof errorMessages[$(this).attr("Name")].typemessage != "undefined") { message = errorMessages[$(this).attr("Name")].typemessage; } return message; } }
        ]
    },
    {
        selector: ".validationMinLength",
        attributes: [
            { name: "data-parsley-minlength", value: function () { return $(this).attr("minLength"); } },
            { name: "data-parsley-minlength-message", value: function () { var message = "Please enter minimum " + $(this).attr("minLength") + " characters"; if (typeof errorMessages[$(this).attr("Name")] != "undefined" && typeof errorMessages[$(this).attr("Name")].minLengthMessage != "undefined") { message = errorMessages[$(this).attr("Name")].minlengthMessage; } return message; } }
        ]
    },
    {
        selector: ".validationMaxLength",
        attributes: [
            { name: "data-parsley-maxlength", value: function () { return $(this).attr("maxLength"); } },
            { name: "data-parsley-maxlength-message", value: function () { var message = "Please enter maximum " + $(this).attr("maxLength") + " characters"; if (typeof errorMessages[$(this).attr("Name")] != "undefined" && typeof errorMessages[$(this).attr("Name")].maxLengthMessage != "undefined") { message = errorMessages[$(this).attr("Name")].maxLengthMessage; } return message; } }
        ]
    }
];

/**********************************************************************************************/

/********************************** List of Documents *****************************/

arrDocuments = [{
    key: "generalInfo",
    value: "General Information",
    routeName: "cand_info",
    isDoc : false
},
{
    key: "employmentHistory",
    value: "Employment History",
    routeName: "cand_emp_history",
    isDoc : false
},
{
    key: "employmentVerificationLetters",
    value: "Employment Verification Letters (docs)",
    routeName: "employmentVerification",
    isDoc : true
},
{
    key: "addressHistory",
    value: "Address History",
    routeName: "address_history",
    isDoc : false
},

{
    key: "candidateAddresses",
    value: "Addresses",
    routeName: "cand_addresses",
    isDoc : false
},

{
    key: "relativesInfo",
    value: "Relatives Information",
    routeName: "relatives_info",
    isDoc : false
},
{
    key: "employmentpaySlips",
    value: "Employment - Payslips (6 months) (docs)",
    routeName: "payslips",
    isDoc : true
},
{
    key: "educationHistory",
    value: "Education History",
    routeName: "edu_history",
    isDoc : false
},
{
    key: "educationCredentials",
    value: "Education Credentials (docs)",
    routeName: "educationalCredentials",
    isDoc : true
},
{
    key: "passport",
    value: "Passport (all pages)",
    routeName: "passport",
    isDoc : true
},
{
    key: "updatedResume",
    value: "Updated Resume (doc)",
    routeName: "resume",
    isDoc : true
},
{
    key: "previouspassport",
    value: "Previous Passport (if applicable)",
    routeName: "previousPassport",
    isDoc : true
},
{
    key: "previousApprovalNotices",
    value: "Previous approval notices - I-797, I-20, EAD, PERM, I-140 (if applicable)",
    routeName: "previousApproval",
    isDoc : true
},
{
    key: "i_94",
    value: "I-94 (if applicable)",
    routeName: "i94",
    isDoc : true
},
{
    key: "educationEvaluation",
    value: "Education evaluation (if applicable)",
    routeName: "educationEvaluation",
    isDoc : true
},
{
    key: "socialSecurityCard",
    value: "Social Security Card (if applicable)",
    routeName: "ssCard",
    isDoc : true
},
{
    key: "h4_h1_cos_Marriage_Certificate",
    value: "H4 to H1, COS - Marriage Certificate (if applicable)",
    routeName: "marriageCertificate",
    isDoc : true
},
{
    key: "h4_h1_cos_Spouse_h1_b_approvalNotice",
    value: "H4 to H1, COS - Spouse - H1-B Approval Notice (if applicable)",
    routeName: "spouseH1B",
    isDoc : true
},
{
    key: "h4_h1_cos_Spouse_passport_visaStamp_i_94",
    value: "H4 to H1, COS - Spouse - Passport, Visa Stamp, and I-94 (if applicable)",
    routeName: "spousePassport",
    isDoc : true
},
{
    key: "h4_h1_cos_Spouse_recent_w2",
    value: "H4 to H1, COS - Spouse - Recent W2 (if applicable)",
    routeName: "spouseRecentw2",
    isDoc : true
},
{
    key: "h4_h1_cos_Spouse_payStubs",
    value: "H4 to H1, COS - Spouse - Pay stubs (if applicable)",
    routeName: "spousePaystubs",
    isDoc : true
},
];

/**********************************************************************************************/
employerDocList = [{
    key: "offer_letter",
    value: "Offer letter"
},
{
    key: "confidentiality_and_non_compete_agreement",
    value: "CONFIDENTIALITY AND NON COMPETE AGREEMENT"
},
{
    key: "employee_agreement",
    value: "Employee Agreement"
},
{
    key: "right_to_control",
    value: "Right to Control"
},
{
    key: "performance_review",
    value: "Performance Review"
}];

employerSpecificDocList = [{
    key: "job_itinerary",
    value: "Job Itinerary"
},
{
    key: "i_129H_1_129H_petition_support_letter",
    value: "I-129H 1-129H Petition for Nonimmigrant Worker Petition - Support Letter"
},
{
    key: "client_letter",
    value: "Client Letter"
},
{
    key: "msa",
    value: "MSA (MASTER SERVICE AGREEMENT) (can be combined with PO. MSA/PO)"
},
{
    key: "po_wo",
    value: "PO (PURCHASE ORDER OR WORK ORDER)"
},
{
    key: "credential_evaluation_document",
    value: "Credential Evaluation document (not for Candidate to see, only for Attorney). Doesn't apply to people who are in US (US address)"
}];

attorneySpecificDocList = [{
    key: "lca",
    value: "LCA"
}]

employerProfileDocList = [{
    key: "lease_agreement",
    value: "Lease Agreement"
},
{
    key: "organizational_chart",
    value: "Organizational Chart"
},
{
    key: "tax_returns",
    value: "Tax Returns"
},
{
    key: "rental_agreement",
    value: "Current Rental Agreement, lease or Mortgage dated by all parties"
},
{
    key: "business_license",
    value: "Business license"
},
{
    key: "article_of_incorporation",
    value: "Article of incorporation"
},
{
    key: "state_quarterly_wage_report",
    value: "State Quarterly wage report"
},
{
    key: "federal_tax_statement",
    value: "Federal tax statement"
},
{
    key: "invoice_or_payment_receipt_at_company_address",
    value: "Invoice or Payment receipt at company address"
},
{
    key: "copy_of_job_postings_in_similar_organization",
    value: "Copy of Job Postings in similar organization"
},
{
    key: "letter_from_association_related_to_industry",
    value: "Letter from Association related to industry"
},
{
    key: "copy_of_floor_plan",
    value: "Copy of Floor plan"
},
{
    key: "copy_of_business_plan",
    value: "Copy of Business plan"
},
{
    key: "copy_of_pictures_internal_and_external",
    value: "Copy of pictures internal and external"
},
{
    key: "copy_of_web_site",
    value: "Copy of Web site"
},
{
    key: "copy_of_brochure",
    value: "Copy of Brochure"
}];

informationMessages = {
    'credentialsWrong': 'Your login credentials are incorrect. Please try again.',
    'notValidUser': 'Not valid user. Make sure you validate your email address first.',
    'emailVerifiedFirst': 'Your email address has to be verified first.',
    'AccountRemoved': 'Your Account is removed by Admin.'
}


visaStatus = [{
    key: "new_h1b",
    value: "New H1B"
},
{
    key: "h1b",
    value: "H1B"
},
{
    key: "gc",
    value: "GC"
},
{
    key: "opt",
    value: "OPT"
},
{
    key: "cpt",
    value: "CPT"
},
{
    key: "f1",
    value: "F1"
},
{
    key: "tn_visa",
    value: "TN Visa"
},
{
    key: "h4",
    value: "H4"
}];

processStatus =[{
    key: "new_h1b",
    value: "New H1B"
},{
    key: "h1b_transfer",
    value: "H1B Transfer"
},{
    key: "gc_process",
    value: "GC Process"
},{
    key: "h1_amendment",
    value: "H1 Amendment"
},{
    key: "h1_extension",
    value: "H1 Extension"
}]


connectCategoryForCandidate=[{
    key: "general",
    value: "General"
},{
    key: "payroll",
    value: "Payroll"
},{
    key: "request_appointment",
    value: "Request Appointment"
},{
    key: "h1_related_question",
    value: "H1 related question"
},{
    key: "invoice",
    value: "Invoice"
},{
    key: "timesheet",
    value: "Timesheet"
},{
    key: "vacation",
    value: "Vacation"
},{
    key: "time_off",
    value: "Time off"
}];

connectCategoryForEmploAtto=[{
    key: "general",
    value: "General"
},{
    key: "payroll",
    value: "Payroll"
},{
    key: "timesheet",
    value: "Timesheet"
},{
    key: "status",
    value: "Status"
},{
    key: "other",
    value: "Other"
}]