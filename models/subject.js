const mongoose = require('mongoose');
const { Schema } = mongoose;

// Topic Schema
const TopicSchema = new Schema({
  _id: false, // Disable default _id for subdocuments to save space
  name: { type: String, required: true },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Sub-Subject Schema
const SubSubjectSchema = new Schema({
  _id: false, // Disable default _id for subdocuments to save space
  name: { type: String, required: true },
  description: { type: String, default: '' },
  topics: [TopicSchema], // Array of topics
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Subject Schema
const SubjectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  subSubjects: [SubSubjectSchema], // Array of sub-subjects
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Export the model
const Subject = mongoose.model('Subject', SubjectSchema);
module.exports = Subject;
