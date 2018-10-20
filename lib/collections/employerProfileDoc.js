employerProfileDoc = new Mongo.Collection('employerProfileDoc');


var Schema = {};

employerProfileDoc.attachSchema(new SimpleSchema({
    employerId: {
        type: String
    },
lease_agreement:{
    type: String,
    optional:true
},
organizational_chart:{
    type: String,
    optional:true
},
tax_returns:{
    type: String,
    optional:true
},
rental_agreement:{
    type: String,
    optional:true
},
business_license:{
    type: String,
    optional:true
},
article_of_incorporation:{
    type: String,
    optional:true
},
state_quarterly_wage_report:{
    type: String,
    optional:true
},
federal_tax_statement:{
    type: String,
    optional:true
},
invoice_or_payment_receipt_at_company_address:{
    type: String,
    optional:true
},
copy_of_job_postings_in_similar_organization:{
    type: String,
    optional:true
},
letter_from_association_related_to_industry:{
    type: String,
    optional:true
},
copy_of_floor_plan:{
    type: String,
    optional:true
},
copy_of_business_plan:{
    type: String,
    optional:true
},
copy_of_pictures_internal_and_external:{
    type: String,
    optional:true
},
copy_of_web_site:{
    type: String,
    optional:true
},
copy_of_brochure:{
    type: String,
    optional:true
}

}));