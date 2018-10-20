TabularTables = {};
Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);


hideTableColumns = function (table, columnsToHide) {
    // this line is here only for admin users to see all columns:
    if (Meteor.user() && Meteor.user().profile.role == "attorney") return;
    // here goes the hidding:
    var dt = table.DataTable();
    columnsToHide.map(function (columnIndex) {
        dt.column(columnIndex).visible(false);
    });
};

hideTableColumnsForEmployer = function (table, columnsToHide) {
    // this line is here only for admin users to see all columns:
    if (Meteor.user() && Meteor.user().profile.role == "employer") return;
    // here goes the hidding:
    var dt = table.DataTable();
    columnsToHide.map(function (columnIndex) {
        dt.column(columnIndex).visible(false);
    });
};

TabularTables.employerList = new Tabular.Table({
    name: "employerList",
    collection: user,
    columns: [{
        data: "createdAt",
        visible: false
    },
    {
        data: "emails.0.address",
        title: "Email",
        visible: false
    },
    {
        data: "createdAt",
        title: "Created Date",
        render: function (data, type, row) {
            return moment(data).format('MMM, DD YYYY')
        }
    },
    {
        data: "profile.name",
        title: "Company Name"
    },
    {
        data: "_id",
        title: 'Company Profile View',

        render: function (data, type, row) {
            return '<a href="#" id="view-employer-profile" data-id="' + data + '" class="dic-mode-edit dic">View</a>'
        }
    },
    {
        data: "_id",
        title: 'Candidate List View',

        render: function (data, type, row) {
            return '<a href="#" id="view-candidate-button-list" data-id="' + data + '" class="dic-mode-edit dic">View</a>'
        }
    },
    {
        data: "_id",
        title: 'Make Company as admin',

        render: function (data, type, row) {
             if (row.profile.isCompany) {
                return 'Company registered as admin';
            }
            else {
                 return '<a href="#" id="admin-candidate-button-list" data-id="' + data + '" class="dic-mode-edit dic">Make Company admin</a>'
            }
        }
    }
    ],
    //"dom": '<lf<t>ip>',
    initComplete: function (settings, json) {
        // calls a function for hidding columns according to indexes AFTER table has been init on client:
        hideTableColumnsForEmployer(this, [6]);
    },
    order: [
        [0, 'desc']
    ],
    "columnDefs": [
        { "width": "16%", "targets": 0, bSortable: false, "class": "never" },
        { "width": "16%", "targets": 1, bSortable: false },
        { "width": "20%", "targets": 2, bSortable: false },
        { "width": "20%", "targets": 3, bSortable: false },
        { "width": "20%", "targets": 4, bSortable: false },
        { "width": "20%", "targets": 5, bSortable: false },
        { "width": "20%", "targets": 6, bSortable: false },
    ],
    "fnDrawCallback": (nRow, aData, iDisplayIndex, iDisplayIndexFull) => {
        Meteor.setTimeout(function () {
            $('.dataTables_processing').hide();
        });
    }
});

TabularTables.candidateList = new Tabular.Table({
    name: "candidateList",
    collection: user,
    pub: "tabular_candidate",
    columns: [{
        data: "createdAt",
        title: "Created Date",
        visible: false
    },
    {
        data: "emails.0.address",
        title: "Email",
        visible: false
    },
    {
        data: "profile.employerId",
        visible: false
    },
    {
        data: "createdAt",
        title: "Created Date",
        render: function (data, type, row) {
            return moment(data).format('MMM, DD YYYY')
        }
    },
    {
        data: "profile.name",
        title: "Candidate Name"
    },
    {
        data: "profile.visaType",
        title: "Visa Status",
        render: function (data, type, row) {
            var filterData = visaStatus.filter(function (d, i) {
                return d.key == data;
            });
            if (filterData.length > 0) {
                return filterData[0].value;
            }
            else {
                return '';

            }

        }
    },
    {
        data: "profile.processStatus",
        title: "Process Status",
        render: function (data, type, row) {
            var filterData = processStatus.filter(function (d, i) {
                return d.key == data;
            });
            if (filterData.length > 0) {
                return filterData[0].value;
            }
            else {
                return '';

            }

        }
    },
    {
        data: "profile.dob",
        title: "Date of birth",
        render: function (data, type, row) {
            if (data) {
                return moment(data).format('MMM, DD YYYY')
            }
            else {
                return '';
            }
        }
    },
    {
        data: "profile.location",
        title: "Location"
    },
    {
        data: "profile.phone",
        title: "Phone No."
    },
    {
        data: "profile.employerId",
        title: 'Company Name',
        render: function (data, type, row) {
            debugger;
            if (data && Meteor.user().profile.role == "attorney") {
                var EmployerData = "";

                var DataArray = user.find({
                    _id: {
                        $in: data
                    }
                }, {
                        'profile.name': 1
                    }).fetch();
                EmployerData = DataArray.map(function (item) {
                    return item.profile.name
                })
                EmployerData = EmployerData.join(',')

                return EmployerData;
            }
            else if (data && Meteor.user().profile.role == "employer") {
                return Meteor.user().profile.name;
            } else {
                return '';
            }

        }
    },
    {
        data: "_id",
        title: '',

        render: function (data, type, row) {
            debugger;
            if (Meteor.user().profile.role == "employer" && row.profile.employerId && row.profile.employerId.indexOf(Meteor.userId()) == -1) {
                return 'You are restricted for view detail';
            }
            else {
                return '<a href="#" id="view-candidate-doc-list" data-id="' + data + '" class="dic-mode-edit dic">View</a>'
            }
        }
    },

    ],
    //"dom": '<flipt>',
    order: [
        [0, 'desc']
    ],
    initComplete: function (settings, json) {
        // calls a function for hidding columns according to indexes AFTER table has been init on client:
        hideTableColumns(this, [10]);
    },
    "columnDefs": [
        { "width": "16%", "targets": 0, bSortable: false, "class": "never" },
        { "width": "16%", "targets": 1, bSortable: false },
        { "width": "25%", "targets": 2, bSortable: false },
        { "width": "10%", "targets": 3, bSortable: false },
        { "width": "15%", "targets": 4, bSortable: false },
        { "width": "10%", "targets": 5, bSortable: false },
        { "width": "10%", "targets": 6, bSortable: false },
        { "width": "10%", "targets": 7, bSortable: false },
        { "width": "10%", "targets": 8, bSortable: false },
        { "width": "10%", "targets": 9, bSortable: false },
        { "width": "15%", "targets": 10, bSortable: false },
        { "width": "10%", "targets": 11, bSortable: false },
    ],
    "fnDrawCallback": (nRow, aData, iDisplayIndex, iDisplayIndexFull) => {
        Meteor.setTimeout(function () {
            $('.dataTables_processing').hide();
        });
    }
});


TabularTables.connectList = new Tabular.Table({
    name: "connectList",
    collection: connects,
    pub: "ticketUserName",
    columns: [{
        data: "createdAt",
        visible: false
    },
    {
        data: "createdAt",
        title: "Created Date",
        render: function (data, type, row) {
            return moment(data).format('MMM, DD YYYY')
        }
    },
    {
        data: "requestorId",
        title: "Requestor Name",
        render: function (data, type, row) {
            return user.findOne({ _id: data }).profile.name;
        }
    },
    {
        data: "category",
        title: "Category",
        render: function (data, type, row) {
            var requestorRole = user.findOne({ _id: row.requestorId }).profile.role
            var filterData = [];
            if (requestorRole == "candidate") {
                filterData = connectCategoryForCandidate.filter(function (d, i) {
                    return d.key == data;
                });
            }
            else {
                filterData = connectCategoryForEmploAtto.filter(function (d, i) {
                    return d.key == data;
                });
            }

            if (filterData.length > 0) {
                return filterData[0].value;
            }
            else {
                return '';

            }

        }
    },
    {
        data: "subject",
        title: "Subject",
    },
    {
        data: "ticketStatus",
        title: "Thread",
    },
     {
        data: "_id",
        title: 'View detail',

        render: function (data, type, row) {
            return '<a href="#" id="view-ticket-button" data-id="' + data + '" class="dic-mode-edit dic">View</a>'
        }
    }
    ],
    //"dom": '<lf<t>ip>',
    order: [
        [0, 'desc']
    ],
    "columnDefs": [
        { "width": "16%", "targets": 0, bSortable: false, "class": "never" },
        { "width": "16%", "targets": 1, bSortable: false },
        { "width": "25%", "targets": 2, bSortable: false },
        { "width": "25%", "targets": 3, bSortable: false },
        { "width": "25%", "targets": 4, bSortable: false },
        { "width": "25%", "targets": 5, bSortable: false },
        { "width": "25%", "targets": 6, bSortable: false },
    ],
    "fnDrawCallback": (nRow, aData, iDisplayIndex, iDisplayIndexFull) => {
        Meteor.setTimeout(function () {
            $('.dataTables_processing').hide();
        });
    }
});