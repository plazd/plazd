const mongoose = require('mongoose');
const { model } = require('./User');

const ResumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
    rollno: {
      type: String,
      required: true
    },
    batch: {
        type: Number,
        required: true
    },
    program: {
      type: String,
      required: true
    },
    branch: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    location: {
        type: String
    },
    altmail: {
        type: String
    },
    skills: {
        type: [String]
    },
    toolsused: {
      type: [String]
    },
    courses: {
        type: [String]
    },
    bio: {
        type: String
    },
    open:{
      type: Boolean,
      default: true
    },
      experience: [
        {
          title: {
            type: String,
            required: true
          },
          position: {
            type: String,
            required : true
          },
          organization: {
            type: String,
            required: true
          },
          location: {
            type: String
          },
          from: {
            type: Date,
            required: true
          },
          to: {
            type: Date
          },
          current: {
            type: Boolean,
            default: false
          },
          description: {
            type: String,
            required: true
          }
        }
      ],
      project: [
        {
          title: {
            type: String,
            required: true
          },
          professor: {
            type: String
          },
          underprof: {
            type: Boolean,
            default: false
          },
          location: {
            type: String
          },
          from: {
            type: Date,
            required: true
          },
          to: {
            type: Date
          },
          current: {
            type: Boolean,
            default: false
          },
          description: {
            type: String,
            required: true
          }
        }
      ],
      education: [
        {
          school: {
            type: String,
            required: true
          },
          degree: {
            type: String,
            required: true
          },
          fieldofstudy: {
            type: String,
            required: true
          },
          from: {
            type: Date,
            required: true
          },
          to: {
            type: Date
          },
          current: {
            type: Boolean,
            default: false
          },
          grade: {
            type: String,
            required: true
          },
          description: {
            type: String
          }
        }
      ],
      achievement: [
        {
          title: {
            type: String,
            required: true
          },
          from: {
            type: Date,
            required: true
          },
          to: {
            type: Date
          },
          current: {
            type: Boolean,
            default: false
          },
          description: {
            type: String,
            required: true
          }
        }
      ],
      social: {
        linkedin: {
          type: String
        },
        github: {
            type: String
        },
        youtube: {
          type: String
        },
        twitter: {
            type: String
        },
        codeforce: {
          type: String
        },
        codechef: {
          type: String
        },
        other: {
          type: String
        }
      },
      date: {
        type: Date,
        default: Date.now
      }
  });

  module.exports = Resume = mongoose.model('resume', ResumeSchema);