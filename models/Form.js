const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  country: {
      type: String,
      required: true
  },
  website: {
    type: String,
    required: true
  },
  typeoforganization: {
    type: String,
    required: true
  },
  natureofbusiness: {
      type: String,
      required: true
  },
  contactdetails: [{
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number
    }
  }],
// Job Profile
     
     int_job:{
         type: Boolean,
         default: false
     },
     intern: [{
        skills: {
            type: String,
            required: true
         },
         noofhiring: {
            type: Number
         },
         jobloc: {
            type: String,
            required: true
         },
         stipend: {
            type: String,
            required: true
         },
         acc_provided: {
            type: String,
            required: true
         },
         perks: {
            type: String,
            required: true
         },
         summerIntern:{
            type: Boolean,
            default: false
         },
         winterIntern:{
            type: Boolean,
            default: false
         },
     }],
     job: [{
        designation:{ 
             type: String,
            required: true
        },
        skills: {
            type: String,
            required: true
        },
        vacancies:{
            type: String
        },
        joiningdate: {
            typr: String,
            required: true
        },
        jobloc: {
            type: String,
            required: true
        }
     }],
    // Salary
    salary: [{
        program: {
            type: String,
            required:true
        },
        ctc: {
            type: Number,
            required: true
        },
        gross: {
            type: Number
        },
        takehome: {
            type: Number,
            required: true
        },
        bonus: {
            type: String
        },
        bond: {
            type: String,
            default: "No"
        },
        terms: {
            type: String,
            default: "No"
        }
    }],
    // Selection Process
    reqCGPA: {
        type: String,
        required: true
    },
    shortlistingCV: {
        type: Boolean,
        default: false
    },
    preplacementtalk: {
        type: Boolean,
        default: false
    },
    gd: {
        type: Boolean
    },
    modeoftest: {
        type: String,
        required: true
    },
    aptitutetest: {
        type: Boolean,
        default: false
    },
    technicaltest: {
        type: Boolean,
        default: false
    },
    techinterview: {
        type: Boolean,
        default: false
    },
    roundtech: {
        type: Number
    },
    hrinterview: {
        type: Boolean,
        default: false
    },
    roundhr: {
        type: Number
    },

    // Logistics
    incampus: {
        type: Boolean,
        default: false
    },
    noofmember: {
        type: String,
        required: true
    },
    noofroom: {
        type: String,
        required: true
    },
    otherreq: {
        type: String
    },
    complete: {
        type: Boolean,
        default: false
    },
    allowed: {
        type: [String],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Form = mongoose.model('form', FormSchema);