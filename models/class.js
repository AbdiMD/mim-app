const mongoose = require("mongoose");
const { Schema } = mongoose;

const classSchema = new Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true, // Ensure this class is unique
  },
  seasonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ScholarSeason", // Reference to the ScholarSeason model
    required: true,
  },
  grade: {
    type: Number,
    required: true, // Grade level (e.g., 1 to 6)
  },
  syllabus: [
    {
      subject: {
        type: String,
        required: true, // Subject name (e.g., Math, Science)
      },
      topics: [
        {
          type: String, // Topics under the subject
        },
      ],
    },
  ],
  evaluations: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student", // Reference to the Student model
        required: true,
      },
      marks: {
        type: Map, // Flexible key-value structure for subject and marks
        of: Number, // e.g., { Math: 85, Science: 90 }
      },
    },
  ],
});

const Class = mongoose.model("class", classSchema);

module.exports = Class;
