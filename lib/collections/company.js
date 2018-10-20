companyList = new Mongo.Collection('companyList');

var Schema = {};

companyList.attachSchema(new SimpleSchema({
    companyName: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date()
            }
        }
    }
}));
